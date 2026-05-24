# Lastz Feedback Terminal

A cinematic, futuristic one-page gaming feedback website built with React, Vite, Tailwind CSS, Framer Motion, GSAP, tsParticles, React Hook Form, Axios, and React Hot Toast.

## Features

- Fullscreen animated loader
- Immersive cyberpunk dashboard UI
- Animated particles and background effects
- Custom gaming cursor
- Premium glassmorphism feedback form
- Auto-resizing textareas and live counters
- Google Sheets integration via Google Apps Script
- Discord webhook notifications
- reCAPTCHA v3 placeholder support
- Theme switcher and secret Konami easter egg
- Local public sound assets with mute toggle
- Responsive mobile/tablet/desktop design

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development site:

```bash
npm run dev
```

## Configure backend

1. Open `apps-script/Code.gs` in Google Apps Script.
2. Replace `YOUR_SPREADSHEET_ID`, `YOUR_DISCORD_WEBHOOK_URL`, and `YOUR_RECAPTCHA_SECRET_KEY`.
3. Deploy as a web app and use the generated URL in `src/components/FeedbackForm.jsx`.
4. Update the reCAPTCHA site key in `index.html`.

## Deployment

- Frontend: Vercel or any static host supporting Vite.
- Backend: Google Apps Script.
- Database: Google Sheets.

## Notes

- The current form endpoint and reCAPTCHA keys are placeholders and must be replaced before production use.
- The app is intentionally built as a premium esports command terminal experience.

