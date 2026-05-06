# WorkPulse — Team Standup & Blocker Management System

A full-stack web application built for the FSAD Assignment 2026.

## Problem Statement
In distributed and hybrid teams, daily standups are often forgotten, 
inconsistently logged, or lost in chat threads. WorkPulse solves this 
by providing a centralized platform where employees log daily updates 
and managers track team progress and blockers in real time.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcryptjs |
| HTTP Client | Axios |
| Routing | React Router |

## Features

### Employee
- Submit daily standup (yesterday / today / blockers)
- View personal standup history
- View personal blockers and their status

### Manager / Admin
- Dashboard with team overview and stats
- See who submitted today and who hasn't
- View all team standups with search/filter
- View and resolve team blockers

## Project Structure
workpulse/
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # MongoDB schemas
│   │   └── routes/       # API routes
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Page components
│   │   ├── services/     # API calls
│   │   └── utils/        # Helper functions
│   └── package.json
└── ai-usage-log.md

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Logged in |
| POST | /api/standups | Employee |
| GET | /api/standups/me | Employee |
| GET | /api/standups/today | Manager |
| GET | /api/standups/team | Manager |
| GET | /api/blockers/me | Employee |
| GET | /api/blockers | Manager |
| GET | /api/blockers/open | Manager |
| PATCH | /api/blockers/:id/resolve | Manager |
| GET | /api/dashboard | Manager |

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
npm run dev
```
Create a `.env` file inside `backend/` with:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Test Users

| Role | Email | Password |
|---|---|---|
| Admin | admin@workpulse.com | password123 |
| Manager | raj@workpulse.com | password123 |
| Employee | sachin@workpulse.com | password123 |

## Roles
- **Employee** — Submit standups, view history, view blockers
- **Manager** — View dashboard, manage blockers, view team
- **Admin** — All manager permissions

## AI Tools Used
Claude (claude.ai) was used for code generation and guidance.
See `ai-usage-log.md` for detailed prompts and reflections.