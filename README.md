# Tally — DTERA

Attendance, timesheets, tickets, resource planning and project budgets for DTERA.
A single-page web app with English and Arabic, installable on phones.

## Deploy to Vercel

### Option A — drag and drop (2 minutes, no tools)
1. Go to https://vercel.com/new and sign in.
2. Drag this whole folder onto the page (or choose **Browse** and pick the folder).
3. Leave **Framework Preset** as **Other**, with no build command and no output directory.
4. Click **Deploy**. You get a link like `https://tally-xxxx.vercel.app`.

### Option B — Vercel CLI
```bash
npm i -g vercel
cd tally-deploy
vercel            # first time: log in, pick a scope, accept the defaults
vercel --prod     # publish to production
```

### Option C — GitHub (auto-deploy on every push)
```bash
cd tally-deploy
git init && git add . && git commit -m "Tally for DTERA"
git branch -M main
git remote add origin https://github.com/<your-account>/tally-dtera.git
git push -u origin main
```
Then on https://vercel.com/new choose **Import Git Repository**, pick the repo and click **Deploy**.

### Custom domain (optional)
In the Vercel project: **Settings → Domains → Add**, e.g. `tally.dtera.com`, then add the
CNAME record Vercel shows you at the DNS provider.

## Install on a phone
Open the deployed link on the phone:
- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** menu → **Install app** / **Add to Home screen**.

It opens full-screen with its own icon and keeps working offline after the first visit.

## What's in the folder
| File | Purpose |
|---|---|
| `index.html` | The whole app (UI, logic, demo data) |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png`, `favicon.png` | Install-as-app support |
| `sw.js` | Offline support (network first, cached fallback) |
| `vercel.json` | Routes every page URL (e.g. `/admin/reports`) to the app, plus security headers |

## Important: this is a prototype
- Data is stored in each browser (`localStorage`). Different people and devices do not share data.
- "Sign in with Microsoft" is shown but not connected.
- Use **Settings → Reset demo data** to start over.

To go live for real, the next step is a backend (e.g. Supabase or a Node/.NET API with a database)
and Microsoft Entra ID sign-in for the DTERA tenant.
