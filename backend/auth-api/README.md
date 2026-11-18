# User Authentication REST API

A complete User Authentication REST API built with Node.js, Express.js, MongoDB, Mongoose, `bcryptjs`, and `jsonwebtoken`.

## Folder Structure
```text
auth-api/
  config/db.js
  controllers/authController.js
  middleware/authMiddleware.js
  middleware/errorMiddleware.js
  models/User.js
  routes/authRoutes.js
  .env.example
  .gitignore
  package.json
  server.js
  README.md
```

## 1. Installation & Environment Setup
```bash
cd backend/auth-api
npm install
cp .env.example .env
```
Configure `.env`:
- `MONGO_URI`: Local MongoDB (`mongodb://127.0.0.1:27017/user_auth_api`) or MongoDB Atlas URI.
- `JWT_SECRET`: A strong, unpredictable random string (e.g. 32+ characters).

## 2. Running the Server
```bash
npm start
# or for development auto-reload
npm run dev
```

## 3. Postman Testing Guide
Base URL: `http://localhost:5001`

### 1) Register a New User — `POST /api/auth/register`
- **Body (raw JSON):**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "securePassword123"
}
```
- **Expected Response (`201 Created`):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1c1234567890abcdef123",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "createdAt": "2026-11-18T16:10:00.000Z"
  }
}
```

### 2) Register Using an Existing Email — `POST /api/auth/register`
- Send the same email again.
- **Expected Response (`409 Conflict`):**
```json
{
  "success": false,
  "message": "An account with this email already exists"
}
```

### 3) Login with Correct Credentials — `POST /api/auth/login`
- **Body (raw JSON):**
```json
{
  "email": "priya@example.com",
  "password": "securePassword123"
}
```
- **Expected Response (`200 OK`):** Returns `token` and safe `user` fields (never password hash).

### 4) Login with Incorrect Credentials — `POST /api/auth/login`
- **Body (raw JSON):**
```json
{
  "email": "priya@example.com",
  "password": "wrongPassword"
}
```
- **Expected Response (`401 Unauthorized`):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 5) Access Profile Without a Token — `GET /api/auth/profile`
- Leave `Authorization` header empty.
- **Expected Response (`401 Unauthorized`):**
```json
{
  "success": false,
  "message": "Not authorized: missing Bearer token"
}
```

### 6) Access Profile With a Valid JWT Token — `GET /api/auth/profile`
- **Headers:** `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "user": {
    "id": "65f1c1234567890abcdef123",
    "name": "Priya Sharma",
    "email": "priya@example.com"
  }
}
```

## 4. GitHub Upload Instructions
```bash
git init
git add .
git commit -m "Add User Authentication REST API"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
Note: `.env` and `node_modules/` are ignored via `.gitignore` so secrets are never pushed.
