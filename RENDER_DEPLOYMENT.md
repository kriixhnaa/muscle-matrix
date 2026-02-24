# Render.com Backend Deployment Guide

## Step 1: Create Web Service

1. Go to https://dashboard.render.com
2. Sign up with your GitHub account
3. Click **"New"** → **"Web Service"**
4. Find and select your **"musclematrx"** repository
5. Click **"Connect"**

## Step 2: Configure Basic Settings

On the next screen, fill in:

| Setting | Value |
|---------|-------|
| Name | musclematrx-backend |
| Root Directory | server |
| Environment | Node |
| Build Command | npm install |
| Start Command | npm start |

## Step 3: Add Environment Variables

**This is where you add your MongoDB URL:**

1. Scroll down to the **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. For each variable, add:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://kriixhnaa:Krishan@2006@kriixhnaa.yspmjyi.mongodb.net/`

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `musclematrx123` (or any random string)

**Variable 3:**
- Key: `PORT`
- Value: `5000`

## Step 4: Create the Service

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Wait 2-3 minutes for it to deploy

## Step 5: Get Your Backend URL

Once deployed, you'll see a URL like:
`https://musclematrx-backend.onrender.com`

**Copy this URL** - you'll need it for the frontend!

## Troubleshooting

If you don't see where to add environment variables:
- Look for a section called **"Environment"** or **"Environment Variables"**
- It's usually below the build settings
- You may need to scroll down the page

Still having trouble? Take a screenshot of your Render setup page and send it to me!
