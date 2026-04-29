#  AuthSphere - Full Stack Authentication System

A production-grade authentication and user management system built with the MERN stack (MongoDB, Express, React, Node.js). Features JWT-based authentication, role-based access control, and a professional UI.

## 🚀 Live Demo

**[View Live Application](https://authsphere.vercel.app)**

> **Test Credentials:**  
> Email: `demo@example.com` | Password: `demo123` *(Register a new account to test)*

---

## 📸 Screenshots

| Home Page | Register | Login |
|-----------|----------|-------|
| ![Home Page](screenshots/Screenshot%202026-04-30%20at%2001-03-42%20frontend.png) | ![Register](screenshots/Screenshot%202026-04-30%20at%2001-03-54%20frontend.png) | ![Login](screenshots/Screenshot%202026-04-30%20at%2001-04-06%20frontend.png) |

| Dashboard | Admin Panel |
|-----------|-------------|
| ![Dashboard](screenshots/Screenshot%202026-04-30%20at%2001-03-14%20frontend.png) | ![Admin Panel](screenshots/Screenshot%202026-04-30%20at%2001-02-59%20frontend.png) |

---

## ✨ Features

### Authentication
- 🔑 **User Registration** with input validation
- 🔓 **User Login** with JWT token generation
- 🔒 **Logout** with session termination
- ✅ **Input Validation** (name, email format, password strength)

### Profile Management
- 👤 **View Profile** - See your details and account info
- ✏️ **Edit Profile** - Update name, description, and school
- 🗑️ **Delete Account** - Permanently remove your account

### Admin Dashboard
- 📊 **Stats Overview** - Total users, admin count, regular users
- 👥 **User Management** - View all registered users in a table
- 🔍 **Search Users** - Filter by name, email, or school
- ❌ **Delete Users** - Remove any user (self-deletion protected)
- 🛡️ **Role Protection** - Regular users cannot access admin routes

### Security
- 🔐 **Password Hashing** with bcrypt (10 salt rounds)
- 🎫 **JWT Authentication** with HTTP-Only cookies
- 🛡️ **Role-Based Access Control** (User vs Admin)
- 🚫 **Route Protection** - Unauthorized users redirected
- 🔒 **CORS Configuration** - Only allows trusted origins
- 🛑 **Input Sanitization** - Prevents malicious data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js (Vite), Tailwind CSS, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | express-validator |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## 📁 Project Structure

```
authsphere/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js  # Register, Login, Logout
│   │   │   ├── userController.js  # Profile CRUD
│   │   │   └── adminController.js # Admin operations
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  # JWT verification
│   │   │   └── adminMiddleware.js # Admin role check
│   │   ├── models/
│   │   │   └── User.js           # User schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js     # Auth endpoints
│   │   │   ├── userRoutes.js     # User endpoints
│   │   │   └── adminRoutes.js    # Admin endpoints
│   │   └── utils/
│   │       └── generateToken.js  # JWT generation
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── PrivateRoute.jsx  # Auth guard
    │   │   └── AdminRoute.jsx    # Admin guard
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global state
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Login form
    │   │   ├── Register.jsx      # Registration form
    │   │   ├── Dashboard.jsx     # User profile
    │   │   └── AdminPanel.jsx    # Admin dashboard
    │   └── utils/
    │       └── axios.js          # API client
    ├── vercel.json               # SPA routing
    └── package.json
```

---

## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/ahammedSumon/authsphere.git
cd authsphere
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```
Backend runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Run the frontend:
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173`

### 4. Create Admin User
After registering, manually change `role` from `"user"` to `"admin"` in MongoDB Atlas to access admin features.

---

## 📡 API Endpoints

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get token |
| POST | `/api/auth/logout` | Logout & clear token |

### Protected Routes (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get own profile |
| PUT | `/api/users/profile` | Update profile |
| DELETE | `/api/users/profile` | Delete account |

### Admin Routes (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| DELETE | `/api/admin/users/:id` | Delete a user |

---

## 🔒 Security Features Deep Dive

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | bcrypt with 10 salt rounds |
| **JWT Tokens** | Signed with secret, 7-day expiry |
| **HTTP-Only Cookies** | Prevents XSS attacks |
| **CORS** | Whitelisted origins only |
| **Input Validation** | express-validator on all endpoints |
| **Role Protection** | Middleware checks `req.user.role` |
| **Self-Delete Protection** | Admin cannot delete own account |

---

## 🐛 Challenges & Solutions

### Cross-Domain Cookie Issue
**Problem:** Cookies set by Render backend were stripped by Cloudflare proxy, preventing authentication on Vercel frontend.

**Solution:** Implemented token transmission via request body and `Authorization` header as fallback, with localStorage for token persistence.

### SPA Routing on Vercel
**Problem:** Hard refresh on Vercel returned 404 errors for client-side routes.

**Solution:** Added `vercel.json` with rewrite rules to serve `index.html` for all routes.

---

## 🔮 Future Enhancements

- [ ] Email verification with Nodemailer
- [ ] Password reset flow
- [ ] Profile picture uploads
- [ ] Pagination for admin user list
- [ ] Rate limiting for API protection
- [ ] Refresh token rotation
- [ ] Unit & integration tests
- [ ] Docker containerization

---

## 🎓 What I Learned

- Building RESTful APIs with Express.js
- Implementing JWT authentication
- Role-based authorization middleware
- MongoDB schema design with Mongoose
- React Context API for global state
- Protected routes with React Router
- Professional UI with Tailwind CSS
- CORS and cookie security
- Deploying to Vercel and Render
- Debugging cross-domain issues
- Git version control best practices

---

## 👨‍💻 Author

**Salauddin Ahammed Sumon**

[![GitHub](https://img.shields.io/badge/GitHub-ahammedSumon-181717?style=flat&logo=github)](https://github.com/ahammedSumon)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Salauddin%20Ahammed-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/salauddin-ahammed-626043278/)

📧 Email: salauddin18@cse.pstu.ac.bd

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <b>⭐ Star this repo if you found it helpful!</b>
</p>