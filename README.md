# Kinora

**Every generation. One circle of care.**

Kinora is a family health companion for Indian households. It puts reports, medicines, diet, daily habits and an emergency ID for every family member in one calm place, in plain language, in English and हिन्दी.

> Hackathon prototype. All people, readings and doctors in the demo are sample data. Kinora gives information, not a diagnosis.

## The problem

In many families, health information is scattered: lab reports in WhatsApp, prescriptions in a drawer, and one person (usually a grown-up child) remembering everyone's tablets. Older family members struggle to understand their own numbers. In an emergency, nobody has the blood group, allergies and medicine list in one place.

## What Kinora does

| Screen | What it does |
|---|---|
| **Sign-in** | Phone or email sign-in with a one-time code. No password. |
| **Care hub** | Heart rate, oxygen and blood pressure turned into a short "daily health story" in everyday words. Water tracker, air-quality note for breathing conditions, and a "not feeling well" box with safe first steps that points to **112** for urgent symptoms. |
| **Reports** | Upload a lab report, enter the key reading, and see how it changed over time with a plain-language explanation. |
| **Diet & yoga** | Food ideas matched to each person's condition, a kitchen-and-medicine guard (for example thyroid tablet timing), and gentle seated yoga. |
| **Medicines** | Search a tablet for what it does and when it is usually taken. Shared family reminders with "mark as taken", and a refill warning when a strip is running out. |
| **Clinic & SOS** | A one-page clinic summary to copy and share with consent, and an Emergency Medical ID with blood group, allergy, conditions, medicines and a one-tap 112 call. |

Also: add family members, edit profiles, per-person sharing consent, English / हिन्दी toggle, works on phone and desktop.

## Tech stack

| Layer | Technology |
|---|---|
| Backend framework | **Python 3 + Flask** |
| Database | **SQLite** (tables: users, families, otp_codes, sessions) |
| API | JSON REST API: sign-in codes, sessions, family health record |
| Front end | HTML, CSS and plain JavaScript (no front-end framework) |
| Production server | Gunicorn |
| Hosting | Render (free plan) |

### API

| Method and path | What it does |
|---|---|
| `GET /api/health` | Server check |
| `POST /api/auth/send-code` | Creates a 6-digit one-time code (valid 5 minutes, 20-second cooldown) |
| `POST /api/auth/verify` | Checks the code (5 tries), creates the user and family, returns a session token |
| `GET /api/state` | Returns the signed-in family's saved health record |
| `PUT /api/state` | Saves the family's health record |
| `POST /api/auth/logout` | Ends the session |

### Security basics built in
- One-time codes and session tokens are stored **hashed**, never in plain text.
- Codes expire, have a cooldown, and lock after 5 wrong tries.
- Every health record request needs a valid session token.
- Demo mode ("Explore the family demo") never touches the server.

## Run it on your computer

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000. Choose **Explore the family demo**, or sign in with any Indian mobile number starting 6 to 9 (for example 9876543210) and a family name. In demo mode the app shows your one-time code on screen, because no SMS is sent.

## Deploy on Render (free)

1. Push this repository to GitHub.
2. On [render.com](https://render.com), choose **New, then Web Service** and connect the repository.
3. Set **Build command** to `pip install -r requirements.txt` and **Start command** to `gunicorn app:app`.
4. Add environment variable `KINORA_SECRET` with any long random text.
5. Deploy. Render gives you a live link.

Note: on the free plan the service sleeps when idle (the first load can take about a minute) and the SQLite file can reset when the service restarts. For real use, move to a hosted PostgreSQL database.

## Project structure

```
app.py             Flask backend and database
requirements.txt   Python dependencies
render.yaml        optional Render setup
static/
  index.html       page shell
  style.css        styles
  app.js           app logic
  images/          photos used by the screens
```

## Limits of this prototype

- Sign-in codes are shown on screen in demo mode. Connect an SMS or email provider in `send_code()` in `app.py` and set `KINORA_DEMO=0` for real use.
- Each phone number or email has its own family record. Inviting other relatives into the same family is the next step.
- Lab reports are not read automatically. The user types the key value after uploading.
- The air-quality reading is a fixed demo value.
- The microphone button opens a text box instead of recording.
- A family's record is stored as one JSON document. A fully normalised database is on the roadmap.

## Roadmap

1. Invite relatives into one family with a family code.
2. Real SMS and email delivery for sign-in codes.
3. PostgreSQL, and separate tables for members, readings, medicines and reports.
4. Automatic reading of lab reports (OCR) with a review step before saving.
5. Live air quality for the user's city.
6. Voice input in Hindi and other Indian languages.
7. Reminders by WhatsApp and push notification, and refill ordering with a pharmacy.
8. Doctor-side view for clinic summaries shared with consent.

## Safety note

Kinora is informational support, not a medical device and not a diagnosis. For medical advice, speak with a clinician. In an emergency in India, call **112**.

## License

MIT. See `LICENSE`.
