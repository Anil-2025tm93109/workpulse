# AI Usage Log — WorkPulse (FSAD Assignment)

**Tool Used:** Claude (claude.ai)  
**Approach:** Option A — Built with AI assistance from scratch  

---

## Entry 1 — Project Setup & Auth APIs
**Date:** 2026-05-05  
**Tool:** Claude  

### Prompts Used:
- "Write a MongoDB connection file using mongoose"
- "Write a User model with name, email, password, role, team fields"
- "Write a Standup model linked to User"
- "Write a Blocker model with status open/resolved"
- "Write JWT auth middleware with role based access"
- "Write register and login controllers with bcrypt and JWT"
- "Write Express routes for auth"
- "Write the main index.js entry point"

### What AI Generated:
- db.js — MongoDB connection
- User.js — User schema with role based access
- Standup.js — Standup schema linked to User
- Blocker.js — Blocker schema with status tracking
- authMiddleware.js — JWT verification and role checking
- authController.js — Register and login logic
- authRoutes.js — Auth API routes
- index.js — Main Express server entry point

### What I Modified:
- Changed MongoDB connection string from SRV format to
  standard format due to DNS issue on local network
- Chose database name "workpulse" and added it to URI
- Set up MongoDB Atlas manually including cluster, 
  database user and network access

### What I Learned:
- How JWT tokens are created and verified
- How bcrypt hashes and compares passwords securely
- How Express middleware chains work (protect → managerOnly)
- How Mongoose schemas define data structure
- How .env files protect secrets from GitHub
- How MongoDB Atlas cloud database is configured

## Entry 2 — Standup, Blocker & Dashboard APIs
**Date:** 2026-05-05  
**Tool:** Claude  

### Prompts Used:
- "Write a standup controller with submit, get my history,
   get team standups, get today's standups"
- "Prevent duplicate standup submission for same user same day"
- "Automatically create a Blocker record when hasBlocker is true"
- "Write a blocker controller with get all, get open,
   get mine, resolve blocker"
- "Write a dashboard controller showing who submitted today,
   who hasn't, open blocker count"
- "Write routes for standups, blockers and dashboard
   with role based protection"
- "Update index.js to register new routes"

### What AI Generated:
- standupController.js — Standup CRUD operations
- blockerController.js — Blocker management
- dashboardController.js — Team overview and stats
- standupRoutes.js — Standup API routes
- blockerRoutes.js — Blocker API routes
- dashboardRoutes.js — Dashboard API route
- Updated index.js with all new routes

### What I Modified:
- Tested each API manually in Postman
- Verified duplicate prevention working correctly
- Confirmed blocker auto-creation when hasBlocker is true

### What I Learned:
- How to use .populate() to fetch related documents in MongoDB
- How to get today's date in YYYY-MM-DD format in JavaScript
- How to prevent duplicate submissions using findOne()
- How countDocuments() works for quick counts
- How to chain multiple middleware (protect + managerOnly)
- How role based access control works in Express

---

## Entry 3 — React Frontend Setup
**Date:** 2026-05-05  
**Tool:** Claude  

### Prompts Used:
- "Set up React with Vite and Tailwind CSS"
- "Explain what Vite is and why we use it"
- "Explain what Tailwind CSS is and how it works"
- "Create an Axios service file with JWT interceptor"
- "Create an Auth Context with login, logout and token persistence"
- "Create a Login page with role based redirect"
- "Set up React Router with protected routes"

### What AI Generated:
- React + Vite project structure
- Tailwind CSS configuration
- api.js — Axios service with automatic token attachment
- AuthContext.jsx — Global auth state management
- Login.jsx — Login page with role based redirect
- App.jsx — Router with protected routes
- main.jsx — App entry point with providers

### What I Modified:
- Fixed App.jsx paste error (missing closing bracket)
- Tested login flow and verified token saved in localStorage
- Verified role based redirect working for admin vs employee

### What I Learned:
- How React Context API provides global state across components
- How Axios interceptors automatically attach JWT tokens
- How protected routes redirect unauthenticated users
- How useNavigate redirects based on user role
- How Vite serves React apps faster than Create React App
- How Tailwind utility classes replace traditional CSS

## Entry 4 — All Frontend Pages
**Date:** 2026-05-06  
**Tool:** Claude  

### Prompts Used:
- "Create a Navbar component with role based navigation"
- "Create a Dashboard page showing team stats and cards"
- "Create a Standup form page for employees"
- "Create a My History page showing past standups"
- "Create a Blocker Board page for managers with resolve button"
- "Create a Team Standups page with search and filter"
- "Create a My Blockers page for employees"
- "Update App.jsx with all routes and protected route wrapper"

### What AI Generated:
- Navbar.jsx — Role based navigation bar
- Dashboard.jsx — Manager dashboard with stats cards
- StandupForm.jsx — Employee standup submission form
- MyHistory.jsx — Employee standup history view
- BlockerBoard.jsx — Manager blocker management
- TeamStandups.jsx — Manager team standup view with search
- MyBlockers.jsx — Employee personal blockers view
- Updated App.jsx with all 7 routes

### What I Modified:
- Tested every page manually with different user roles
- Verified role based access control on all routes
- Tested Mark Resolved functionality end to end
- Tested duplicate standup prevention from UI
- Verified search functionality on Team Standups page

### What I Learned:
- How useEffect fetches data when a page loads
- How to filter arrays in React (open vs resolved blockers)
- How conditional rendering works in JSX
- How components communicate through props
- How React Router navigates between pages
- How to show loading and error states in UI

## Entry 5 — Documentation
**Date:** 2026-05-09  
**Tool:** Claude  

### Prompts Used:
- "Create a professional README.md for the project"
- "Help me set up Postman API documentation collection"
- "What should I include in the Postman collection"

### What AI Generated:
- README.md — Complete project documentation
- Postman collection structure and guidance

### What I Modified:
- Changed project name to 
  "Team Standup & Blocker Management System" throughout
- Updated Login.jsx and Navbar.jsx with new name
- Added real test users to README (Raj Manager, Priya Employee)
- Created and exported Postman collection manually

### What I Learned:
- How to write professional API documentation
- How to export Postman collections as JSON
- Importance of README for project submission

## Final Reflection

### Which AI Tools Were Used:
Claude (claude.ai) was used throughout the entire project for
guidance, code generation, explanation and debugging.

### What AI Generated vs What I Did Manually:

**AI Generated:**
- All backend code
- All frontend components and pages
- README documentation structure

**Done Manually:**
- MongoDB Atlas account setup and configuration
- Fixing MongoDB SRV DNS connection issue
- Postman API testing and collection creation
- Understanding and verifying every line of code
- Debugging issues as they arose
- Git commits and GitHub repository management
- Final testing with multiple user roles
- Demo video recording and submission

### Did AI Help or Hinder Understanding:
AI has helpmed me to complete the development quickly by providing correct, working code in most cases. The step-by-step approach ensured that I understood each piece before moving to the next rather than just copying code, I learned why each part was written the way it was. There was an issue occured with the MongoDB SRV DNS issue which required manual troubleshooting from my end and decided to switch to standard connection string.

### Issues Encountered with AI Generated Code:
- There was an issue occured with the MongoDB SRV DNS issue which required manual troubleshooting from my end and decided to switch to standard connection string
- Closing bracket missed in app.jsx due to incomplete paste
  — had to identify and fix the syntax error manually
- Had to understand the difference between SRV and standard
  MongoDB connection strings

### What I Learned From This Project:
- Complete full stack development flow from database to UI
- JWT authentication and role based access control
- React Context API for global state management
- MongoDB Atlas cloud database setup and configuration
- API documentation with Postman
- How to debug connection and syntax errors
- How middleware chains work in Express
- How protected routes work in React Router