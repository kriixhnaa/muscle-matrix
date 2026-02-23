# 🏋️ MuscleMatrix - Multi-tenant Gym Management System

A production-ready MERN stack multi-tenant SaaS application for gym management.

## 📁 Project Structure

```
musclematrx/
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── memberController.js
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/
│   │   ├── Gym.js
│   │   └── Member.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── memberRoutes.js
│   ├── server.js          # Main server entry
│   ├── package.json
│   └── .env.example
│
├── client/                 # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddMember.jsx
│   │   │   ├── MembersList.jsx
│   │   │   └── EditMember.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```
bash
npm install
```

3. Create environment file:
```
bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```
env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

5. Start the backend server:
```
bash
npm run dev
# OR for production
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```
bash
cd client
```

2. Install dependencies:
```
bash
npm install
```

3. Create environment file:
```
bash
cp .env.example .env
```

4. Edit `.env` file (optional for local development):
```
env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```
bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## ☁️ Deployment Guide

### Backend - Render

1. **Push code to GitHub**

2. **Create a new Web Service on Render:**
   - Go to https://dashboard.render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` folder as the root

3. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Set Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `PORT`: `5000`
   - `FRONTEND_URL`: Your Vercel frontend URL

5. **Deploy**

### Frontend - Vercel

1. **Push code to GitHub**

2. **Create a new project on Vercel:**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure:**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables:**
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-backend.onrender.com/api`)

5. **Deploy**

---

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new gym |
| POST | `/api/auth/login` | Login gym |
| GET | `/api/auth/me` | Get current gym (protected) |

### Members (Protected - requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | Get all members |
| GET | `/api/members/stats` | Get member statistics |
| GET | `/api/members/:id` | Get single member |
| POST | `/api/members` | Add new member |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Delete member |

---

## 🛡️ Security Features

- **Password Hashing**: bcryptjs
- **JWT Authentication**: 7-day token expiry
- **Multi-tenancy**: Every member query is filtered by `gym_id`
- **Environment Variables**: Sensitive data never exposed

---

## 📊 Business Logic

### Plan Types & Duration
- **1 month**: +30 days from start date
- **3 month**: +90 days from start date
- **Yearly**: +365 days from start date

### Member Status Calculation
- **Expired**: `expiry_date < today`
- **Expiring Soon**: `expiry_date` within 7 days
- **Active**: All other members

### Statistics
- Total Members: All members
- Active Members: Non-expired memberships
- Expired Members: Expired memberships
- Expiring Soon: Within 7 days of expiry
- Total Revenue: Sum of all paid memberships

---

## 🎨 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Context API

---

## 📝 License

MIT License
