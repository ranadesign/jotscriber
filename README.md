# Jotscriber

Turn handwritten notes into clean, editable, shareable text with AI.

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key

# 3. Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`

> **Note:** In local development, API calls go through Vite's proxy. 
> The serverless function in `/api/transcribe.js` is used in production on Vercel.

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create jotscriber --public --push
```

Or create a repo on github.com and push manually:

```bash
git remote add origin https://github.com/YOUR_USERNAME/jotscriber.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Import Project"** and select your `jotscriber` repo
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your API key from [console.anthropic.com](https://console.anthropic.com)
4. Click **Deploy**

Your app will be live at `https://jotscriber.vercel.app` (or your custom domain).

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `jotscriber.com`)
3. Update your DNS records as instructed

## Project Structure

```
jotscriber/
├── api/
│   └── transcribe.js     # Vercel serverless function (proxies to Anthropic)
├── public/
│   └── favicon.svg        # App icon
├── src/
│   ├── App.jsx            # Main application component
│   └── main.jsx           # React entry point
├── index.html             # HTML template
├── package.json
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel routing config
├── .env.example           # Environment variable template
└── .gitignore
```

## How It Works

- **Frontend:** React (Vite) — handles UI, file uploads, editing, library management
- **Backend:** Vercel serverless function — proxies API calls to Anthropic so your API key stays secret
- **AI:** Claude Sonnet via the Anthropic API — transcribes handwriting from images

## What's Next

Before going fully production, you'll want to add:

- **Real auth:** Firebase Auth or Clerk for Google sign-in
- **Database:** Firestore or Supabase for persisting saved items, folders, outlines
- **Payments:** Stripe for Pro tier (when ready to launch paid features)
- **Rate limiting:** Prevent abuse on the serverless function

## Cost

Each transcription costs roughly $0.01–0.02 in API fees. With 100 free users doing 
10 transcriptions each per month, expect ~$15/month in API costs.
