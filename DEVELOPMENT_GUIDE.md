# MuscleMatrix Project Development Guide

This guide outlines essential steps for developing the MuscleMatrix application, a multi-tenant system for gym operations management.

## Step 1: Choose Tech Stack (Keep It Simple)

Recommended stack is **MERN** for speed, flexibility, and strong learning value.

| Component | Recommended (MERN) | Alternative (Easier) |
|---|---|---|
| Frontend | React | — |
| Backend | Node.js + Express | Firebase |
| Database | MongoDB Atlas | Firebase |
| Hosting | Render / Railway | — |
| Authentication | JWT | — |

MERN provides better backend control and a clean path to multi-tenant architecture.

## Step 2: Application Architecture (Simple Multi-Tenant Structure)

### System roles
- **Admin**: Internal control (you)
- **Gym Owner**: Main customer who manages members
- **Members**: Stored as data only (no login in MVP)

### Application flow
1. A gym registers.
2. The system creates a gym account.
3. The gym logs in.
4. The gym adds members.
5. The system tracks membership expiry and revenue.

## Step 3: Database Design (Critical)

Use 3 core collections in MongoDB Atlas.

### 1) `gyms` collection
Stores registration and authentication data for each gym owner.

| Field | Description |
|---|---|
| `_id` | Unique identifier |
| `gym_name` | Gym name |
| `owner_name` | Gym owner name |
| `email` | Login email (unique) |
| `password` | Hashed password |
| `phone` | Contact number |
| `created_at` | Registration date |

### 2) `members` collection
Stores member profile and plan data, linked to one gym.

| Field | Description |
|---|---|
| `_id` | Unique identifier |
| `name` | Member name |
| `phone` | Member phone |
| `plan_type` | `1 month` / `3 month` / `yearly` |
| `plan_price` | Amount paid |
| `start_date` | Plan start date |
| `expiry_date` | Plan expiry date |
| `payment_status` | `paid` / `pending` |
| `gym_id` | Foreign key linking to `gyms._id` |

### 3) `payments` collection (optional, later)
Useful for detailed payment tracking.

| Field | Description |
|---|---|
| `member_id` | Paying member ID |
| `amount` | Payment amount |
| `payment_date` | Payment date |
| `gym_id` | Related gym ID |

## Step 4: Authentication Logic (JWT + Tenant Isolation)

### Login process
1. Verify email and hashed password.
2. Generate JWT token after successful verification.
3. Store `gym_id` in the JWT payload.

### API request logic
Every authenticated request must filter data using `gym_id` from JWT.

Example:

```txt
Show members where gym_id = logged_in_gym_id
```

This is the core of multi-tenancy in the MVP.

## Step 5: MVP Pages You Must Build

### 1) Login page
- Email
- Password

### 2) Dashboard page
Display these metrics:
- Total members
- Active members
- Expiring in 7 days
- Monthly revenue

### 3) Add Member page
Form fields:
- Name
- Phone
- Plan duration
- Plan price
- Start date

Submission logic:
- System auto-calculates `expiry_date` from selected plan.
- Example: `1 month` => `start_date + 30 days`

### 4) Members List page
Table columns:
- Name
- Phone
- Plan
- Expiry
- Status

Filter options:
- Active
- Expired
- Expiring soon

## Step 6: Expiry Logic (Backend)

Run this logic whenever Dashboard or Members List loads.

- If `expiry_date < today` => **Expired**
- If `expiry_date` is within next 7 days => **Expiring Soon**
- Otherwise => **Active**

Implement with straightforward date comparisons on the backend.

## Step 7: Deployment

After MVP stabilization:

1. Deploy backend (Node.js/Express) to **Render**.
2. Deploy frontend (React) to **Vercel**.
3. Point both to the live **MongoDB Atlas** instance.