# Vercel Frontend Deployment Guide

## Step 1: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Find and select your **"musclematrx"** repository
5. Click **"Import"**

## Step 2: Configure Project Settings

Fill in these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | client |
| Build Command | npm run build |
| Output Directory | dist |

## Step 3: Add Environment Variable

**This is IMPORTANT - it tells your frontend where the backend is:**

1. Look for **"Environment Variables"** section
2. Add:

| Name | Value |
|------|-------|
| VITE_API_URL | https://musclematrx-backend.onrender.com |

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes

## Step 5: Get Your Website URL

Once deployed, you'll get a URL like:
`https://musclematrx.vercel.app`

**Your website is now live!**

---

## Important Note

If your frontend can't connect to the backend:
- Make sure you added the VITE_API_URL environment variable correctly
- The backend URL must be exactly: `https://musclematrx-backend.onrender.com`

After deployment, test by:
1. Opening your Vercel URL
2. Try to register a new gym
3. Try to log in

If there are issues, check the browser console (F12) for errors.
