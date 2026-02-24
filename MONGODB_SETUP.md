# MongoDB Atlas Setup Guide

Follow these steps to create your free MongoDB database:

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** button
3. Fill in your details:
   - First name: Your first name
   - Email: Your email address
   - Password: Create a strong password
   - Confirm password: Repeat password
4. Check "I agree to the Terms of Service"
5. Click **"Create Account"**
6. Verify your email (check your inbox)

## Step 2: Create Free Cluster

1. After login, you'll see the dashboard
2. Click **"Create"** button
3. Select **"Free"** (Shared cluster) - it's free forever
4. Choose Cloud Provider: **AWS**
5. Choose Region: **Mumbai (ap-south-1)** - closest to you
6. Cluster Name: Leave as default or name it "musclematrx"
7. Click **"Create Cluster"**
8. Wait 1-2 minutes for it to be created

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Username: `muscleadmin`
4. Password: Create a password (WRITE IT DOWN - you'll need it!)
5. User Privileges: **"Read and Write to any database"**
6. Click **"Add User"**

## Step 4: Allow Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Copy the connection string - it looks like:
   
```
   mongodb+srv://muscleadmin:<password>@musclematrx.xxxxx.mongodb.net/?retryWrites=true&w=majority
   
```
5. Replace `<password>` with the password you created in Step 3

## IMPORTANT: Save This Information

You'll need these for deployment:
- **Connection String**: `mongodb+srv://muscleadmin:YOUR_PASSWORD@musclematrx.xxxxx.mongodb.net/?retryWrites=true&w=majority`
- **Database Username**: muscleadmin
- **Database Password**: [YOUR PASSWORD]

Keep this safe! You'll enter this in Render.com later.
