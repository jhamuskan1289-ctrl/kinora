# Kinora

**Every generation. One circle of care.**

Kinora is a family health companion for Indian households. It keeps reports, medicines, diet, daily habits and an emergency ID for every family member in one calm place, in plain language, in English and हिन्दी (Hindi).

> Kinora is informational support, not a medical device and not a diagnosis. For medical advice, speak with a clinician. In an emergency in India, call **112**.

---

## The problem

In many families, health information is scattered: lab reports sit in WhatsApp, prescriptions in a drawer, and one person (usually a grown-up child) remembers everyone's tablets. Older family members struggle to understand their own numbers. In an emergency, nobody has the blood group, allergies and medicine list in one place.

## Features

| Screen | What it does |
|---|---|
| **Sign-in** | Phone or email sign-in with a one-time code (demo code: `123456`). |
| **Care hub** | Heart rate, oxygen and blood pressure turned into a short "daily health story" in everyday words. Water tracker, an air-quality note for breathing conditions, and a "not feeling well" box that gives safe first steps and points to **112** for urgent symptoms. |
| **Reports** | Upload a lab report, enter the key reading, and see how it changed over time with a plain-language explanation. A vault keeps each member's reports. |
| **Diet & yoga** | Food ideas matched to each person's condition, a kitchen-and-medicine guard (for example, the waiting time after a thyroid tablet), and gentle seated yoga. |
| **Medicines** | Search a tablet name to see what it does and when it is usually taken. Shared family reminders with "mark as taken", and a refill warning when the strip is running out. |
| **Clinic & SOS** | A one-page clinic summary to copy and share with consent, and an Emergency Medical ID with blood group, allergy, conditions, medicines and a one-tap 112 call. |

Also included: add family members, edit profiles, per-person sharing consent, an English / हिन्दी toggle, and a layout that works on phone and desktop.

## Tech stack

Kinora is a plain front-end app. There is no framework, no build step and no backend.

| Layer | Technology |
|---|---|
| Markup | HTML5 (`index.html`) |
| Styling | Plain CSS (`style.css`) |
| Logic | Vanilla JavaScript (`app.js`) |
| Data storage | Browser `localStorage` (one JSON state object) |
| Fonts | Inter via Google Fonts |
| Images | Unsplash photo URLs |
| Languages | English and Hindi |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/static.yml`) |

## Project structure

```
kinora/
├── index.html          # Page shell and script/style links
├── style.css           # All styling
├── app.js              # Screens, state, translations and logic
├── .github/workflows/
│   └── static.yml      # Deploys the site to GitHub Pages on push to main
├── LICENSE
└── README.md
```

## Getting started

No installation is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/jhamuskan1289-ctrl/kinora.git
   cd kinora
   ```
2. Open `index.html` in your browser. Or, for a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.
3. Sign in with any phone number or email and use the demo code `123456`.

## How data is stored

Kinora has no server or database. The app saves its whole state to the browser's `localStorage`, and loads demo data for a sample family the first time it runs.

- Data stays on the device and browser you use. It is not shared between family members.
- Clearing your browser's site data resets the app to the demo data.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow, which publishes the whole repository to GitHub Pages. To enable it, go to **Settings → Pages** in your repository and set the source to **GitHub Actions**.

## Roadmap ideas

- Real sign-in and shared family data using a backend such as Firebase or Supabase
- Real reminders and notifications for medicines
- More languages

## License

MIT. See [`LICENSE`](LICENSE).
