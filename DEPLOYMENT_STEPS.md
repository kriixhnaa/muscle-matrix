# Step-by-Step Deployment Guide for MuscleMatrx

## Prerequisites
- GitHub Account ✅
- MongoDB Atlas Account (Need to create)
- No other accounts needed (using free tiers)

---

## STEP 1: Create MongoDB Atlas Account (Free Database)

### 1.1 Go to MongoDB Atlas
Open your browser and visit: https://www.mongodb.com/cloud/atlas

### 1.2 Create Account
- Click "Try Free" button
- Enter your email and create a password
- Complete the registration

### 1.3 Create Free Cluster
- After login, click "Create" → "Free" (Shared)
- Choose "AWS" as cloud provider
- Select region closest to you (e.g., Mumbai - ap-south-1)
- Click "Create Cluster" button
- Wait 1-2 minutes for setup to complete

### 1.4 Create Database User
- Click "Database Access" (left menu)
- Click "Add New User"
- Username: `muscleadmin`
- Password: Create a strong password (WRITE IT DOWN!)
- Role: "Read and Write to any database"
- Click "Add User"

### 1.5 Allow Network Access
- Click "Network Access" (left menu)
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### 1.6 Get Connection String
- Click "Database" (left menu)
- Click "Connect" button on your cluster
- Choose "Drivers"
- Copy the connection string - it looks like:
  
```
  mongodb+srv://muscleadmin:<YOUR_PASSWORD>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
  
```
- Replace `<YOUR_PASSWORD>` with the password you created in step 1.4

---

## STEP 2: Push Code to GitHub

### 2.1 Create GitHub Repository
- Go to https://github.com
- Click "+" → "New repository"
- Repository name: `musclematrx`
- Choose "Public" or "Private"
- Click "Create repository"

### 2.2 Push Your Code
Run these commands in your terminal (in the musclematrx folder):

```
bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/musclematrx.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## STEP 3: Deploy Backend on Render (Free)

### 3.1 Create Render Account
- Go to https://dashboard.render.com
- Click "Sign Up" → "GitHub" (sign in with GitHub)
- Authorize Render to access your GitHub

### 3.2 Deploy Backend
- Click "New" → "Web Service"
- Find and select your `musclematrx` repository
- In the settings:
  - Name: `musclematrx-backend`
  - Root Directory: `server`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment: `Node`

### 3.3 Add Environment Variables
Scroll down to "Environment Variables" and add:
- `MONGODB_URI`: Your MongoDB connection string from Step 1.6
- `JWT_SECRET`: Generate a random string (use https://randomkeygen.com - "CodeIgniter Encryption Keys")
- `PORT`: `5000`
- `FRONTEND_URL`: Leave blank for now

- Click "Create Web Service"
- Wait 2-3 minutes for deployment

### 3.4 Get Backend URL
- After deployment, you'll see a URL like: `https://musclematrx-backend.onrender.com`
- Copy this URL

---

## STEP 4: Deploy Frontend on Vercel (Free)

### 4.1 Create Vercel Account
- Go to https://vercel.com
- Click "Sign Up" → "GitHub" (sign in with GitHub)
- Authorize Vercel

### 4.2 Deploy Frontend
- Click "Add New..." → "Project"
- Find and select your `musclematrx` repository
- In the settings:
  - Framework Preset: `Vite`
  - Root Directory: `client`
  - Build Command: `npm run build`
  - Output Directory: `dist`

### 4.3 Add Environment Variable
- Click "Environment Variables"
- Add: `VITE_API_URL` = Your Render backend URL + `/api`
  - Example: `https://musclematrx-backend.onrender.com/api`

- Click "Deploy"
- Wait 2-3 minutes

### 4.4 Get Your Live URL
- After deployment, you'll get a URL like: `https://musclematrx.vercel.app`

---

## STEP 5: Update Backend with Frontend URL

### 5.1 Go back to Render Dashboard
- Click on your backend service
- Click "Environment"
- Edit `FRONTEND_URL` and add your Vercel URL
- Click "Save Changes"

---

## DONE! 🎉

Your website is now live at: `https://musclematrx.vercel.app`

- Frontend: https://musclematrx.vercel.app
- Backend API: https://musclematrx-backend.onrender.com
