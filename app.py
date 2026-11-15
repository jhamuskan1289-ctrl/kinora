"""Kinora backend: a small Flask API with a SQLite database.

Run locally:   pip install -r requirements.txt && python app.py
Production:    gunicorn app:app

What it does
  * One-time sign-in codes (OTP) for phone or email
  * Session tokens (stored hashed, expire after 7 days)
  * One saved health record per family, stored in SQLite
  * Serves the web app from the static/ folder

The page and the API run on the same address, so no CORS setup is needed.
"""
import hashlib
import json
import os
import re
import secrets
import sqlite3
import time

from flask import Flask, g, jsonify, request, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("KINORA_DB", os.path.join(BASE_DIR, "kinora.db"))
PEPPER = os.environ.get("KINORA_SECRET", "change-me-in-production")
# In demo mode the code is returned to the app so judges can sign in without SMS.
# Set KINORA_DEMO=0 and connect an SMS or email provider in send_code() for real use.
DEMO_MODE = os.environ.get("KINORA_DEMO", "1") == "1"

OTP_TTL = 5 * 60            # a code is valid for 5 minutes
OTP_COOLDOWN = 20           # seconds between codes for the same contact
OTP_MAX_TRIES = 5
SESSION_TTL = 7 * 24 * 3600
MAX_STATE_BYTES = 300_000

app = Flask(__name__, static_folder="static", static_url_path="")
app.config["MAX_CONTENT_LENGTH"] = 1_000_000


# ---------- database ----------
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
  contact     TEXT PRIMARY KEY,
  family_key  TEXT NOT NULL,
  created_at  REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS families (
  family_key  TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  state       TEXT,
  updated_at  REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS otp_codes (
  contact     TEXT PRIMARY KEY,
  code_hash   TEXT NOT NULL,
  expires_at  REAL NOT NULL,
  tries       INTEGER NOT NULL DEFAULT 0,
  sent_at     REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash  TEXT PRIMARY KEY,
  contact     TEXT NOT NULL,
  family_key  TEXT NOT NULL,
  expires_at  REAL NOT NULL
);
"""


def init_db():
    con = sqlite3.connect(DB_PATH)
    con.executescript(SCHEMA)
    con.commit()
    con.close()


# ---------- helpers ----------
def h(value: str) -> str:
    return hashlib.sha256((PEPPER + value).encode("utf-8")).hexdigest()


def clean_contact(raw):
    raw = (raw or "").strip().lower()
    if re.fullmatch(r"\+91[6-9]\d{9}", raw):
        return raw
    if re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", raw) and len(raw) <= 120:
        return raw
    return None


def clean_family(raw):
    name = re.sub(r"\s+", " ", (raw or "").strip())
    name = re.sub(r"\s*family\s*$", "", name, flags=re.I).strip()
    return name[:40] if name else None


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "family"


def fail(message, status=400):
    return jsonify({"error": message}), status


def send_code(contact, code):
    """Hook for a real SMS or email provider. Demo mode only prints the code."""
    app.logger.info("Kinora sign-in code for %s is %s", contact, code)


def current_session():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    row = get_db().execute(
        "SELECT * FROM sessions WHERE token_hash=? AND expires_at>?",
        (h(auth[7:]), time.time()),
    ).fetchone()
    return row


# ---------- API ----------
@app.get("/api/health")
def health():
    return jsonify({"ok": True, "service": "kinora", "demo_codes": DEMO_MODE})


@app.post("/api/auth/send-code")
def api_send_code():
    data = request.get_json(silent=True) or {}
    contact = clean_contact(data.get("contact"))
    family = clean_family(data.get("family"))
    if not contact:
        return fail("Enter a valid Indian mobile number or email address.")
    if not family:
        return fail("Enter your family name.")
    db = get_db()
    now = time.time()
    row = db.execute("SELECT sent_at FROM otp_codes WHERE contact=?", (contact,)).fetchone()
    if row and now - row["sent_at"] < OTP_COOLDOWN:
        wait = int(OTP_COOLDOWN - (now - row["sent_at"])) + 1
        return fail(f"Please wait {wait} seconds before asking for another code.", 429)
    code = f"{secrets.randbelow(10**6):06d}"
    db.execute(
        "INSERT INTO otp_codes(contact, code_hash, expires_at, tries, sent_at) VALUES(?,?,?,0,?) "
        "ON CONFLICT(contact) DO UPDATE SET code_hash=excluded.code_hash, "
        "expires_at=excluded.expires_at, tries=0, sent_at=excluded.sent_at",
        (contact, h(contact + code), now + OTP_TTL, now),
    )
    db.commit()
    send_code(contact, code)
    out = {"sent": True}
    if DEMO_MODE:
        out["demo_code"] = code
    return jsonify(out)


@app.post("/api/auth/verify")
def api_verify():
    data = request.get_json(silent=True) or {}
    contact = clean_contact(data.get("contact"))
    family = clean_family(data.get("family"))
    code = re.sub(r"\D", "", str(data.get("code") or ""))
    if not contact or not family or len(code) != 6:
        return fail("Enter the 6-digit code.")
    db = get_db()
    now = time.time()
    row = db.execute("SELECT * FROM otp_codes WHERE contact=?", (contact,)).fetchone()
    if not row or row["expires_at"] < now:
        return fail("That code has expired. Go back and ask for a new one.", 400)
    if row["tries"] >= OTP_MAX_TRIES:
        return fail("Too many wrong tries. Ask for a new code.", 429)
    if not secrets.compare_digest(row["code_hash"], h(contact + code)):
        db.execute("UPDATE otp_codes SET tries=tries+1 WHERE contact=?", (contact,))
        db.commit()
        return fail("That code does not match. Check it and try again.", 400)
    db.execute("DELETE FROM otp_codes WHERE contact=?", (contact,))

    user = db.execute("SELECT * FROM users WHERE contact=?", (contact,)).fetchone()
    if user:
        family_key = user["family_key"]
    else:
        family_key = f"{slug(family)}-{secrets.token_hex(3)}"
        db.execute("INSERT INTO users VALUES(?,?,?)", (contact, family_key, now))
        db.execute("INSERT INTO families VALUES(?,?,?,?)", (family_key, family, None, now))
    fam = db.execute("SELECT * FROM families WHERE family_key=?", (family_key,)).fetchone()

    token = secrets.token_urlsafe(32)
    db.execute(
        "INSERT INTO sessions VALUES(?,?,?,?)",
        (h(token), contact, family_key, now + SESSION_TTL),
    )
    db.execute("DELETE FROM sessions WHERE expires_at<?", (now,))
    db.commit()
    return jsonify({
        "token": token,
        "family": fam["name"],
        "state": json.loads(fam["state"]) if fam["state"] else None,
    })


@app.get("/api/state")
def api_get_state():
    s = current_session()
    if not s:
        return fail("Please sign in again.", 401)
    fam = get_db().execute("SELECT * FROM families WHERE family_key=?", (s["family_key"],)).fetchone()
    return jsonify({
        "family": fam["name"],
        "state": json.loads(fam["state"]) if fam["state"] else None,
        "updated_at": fam["updated_at"],
    })


@app.put("/api/state")
def api_put_state():
    s = current_session()
    if not s:
        return fail("Please sign in again.", 401)
    data = request.get_json(silent=True) or {}
    state = data.get("state")
    if not isinstance(state, dict) or not isinstance(state.get("members"), list):
        return fail("That health record is not in the expected format.")
    raw = json.dumps(state, separators=(",", ":"))
    if len(raw.encode("utf-8")) > MAX_STATE_BYTES:
        return fail("That record is too large.", 413)
    db = get_db()
    db.execute(
        "UPDATE families SET state=?, updated_at=? WHERE family_key=?",
        (raw, time.time(), s["family_key"]),
    )
    db.commit()
    return jsonify({"saved": True})


@app.post("/api/auth/logout")
def api_logout():
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        db = get_db()
        db.execute("DELETE FROM sessions WHERE token_hash=?", (h(auth[7:]),))
        db.commit()
    return jsonify({"ok": True})


# ---------- the web app ----------
@app.get("/")
def index():
    resp = send_from_directory(app.static_folder, "index.html")
    resp.headers["Cache-Control"] = "no-cache"
    return resp


init_db()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
