# Notes App Backend with JWT Authentication

A secure Notes App REST API built with Node.js, Express.js, MongoDB, Mongoose, `bcryptjs`, and `jsonwebtoken`. Every notes endpoint is protected by JWT authentication and verifies document ownership so users can only access and modify their own notes.

## Folder Structure
```text
notes-api/
  config/db.js
  controllers/authController.js
  controllers/noteController.js
  middleware/authMiddleware.js
  middleware/errorMiddleware.js
  models/User.js
  models/Note.js
  routes/authRoutes.js
  routes/noteRoutes.js
  .env.example
  .gitignore
  package.json
  server.js
  README.md
```

## 1. Installation & Setup
```bash
cd backend/notes-api
npm install
cp .env.example .env
```
Set `MONGO_URI` and `JWT_SECRET` inside `.env`, then run:
```bash
npm start
# or
npm run dev
```

## 2. Postman Testing Instructions
Base URL: `http://localhost:5002`

1. **User Registration — `POST /api/auth/register`**
   - Body: `{ "name": "User One", "email": "user1@example.com", "password": "password123" }`
   - Expected: `201 Created` with `token` and safe `user` data.

2. **User Login — `POST /api/auth/login`**
   - Body: `{ "email": "user1@example.com", "password": "password123" }`
   - Expected: `200 OK` with `token`. Copy this token for the next steps.

3. **Create a Note with JWT — `POST /api/notes`**
   - Header: `Authorization: Bearer <USER1_TOKEN>`
   - Body: `{ "title": "Internship Notes", "content": "Review Mongoose ownership checks" }`
   - Expected: `201 Created` returning the created note bound to User One's ID.

4. **Get All Personal Notes — `GET /api/notes`**
   - Header: `Authorization: Bearer <USER1_TOKEN>`
   - Expected: `200 OK` returning only notes created by User One.

5. **Get One Note — `GET /api/notes/:id`**
   - Header: `Authorization: Bearer <USER1_TOKEN>`
   - Expected: `200 OK` with the requested note.

6. **Update a Note — `PUT /api/notes/:id`**
   - Header: `Authorization: Bearer <USER1_TOKEN>`
   - Body: `{ "title": "Updated Internship Notes", "content": "Completed JWT verification" }`
   - Expected: `200 OK` with the updated note.

7. **Delete a Note — `DELETE /api/notes/:id`**
   - Header: `Authorization: Bearer <USER1_TOKEN>`
   - Expected: `200 OK` confirming deletion.

8. **Try Accessing Notes Without a JWT — `GET /api/notes`**
   - Omit `Authorization` header.
   - Expected: `401 Unauthorized` (`"Not authorized: missing Bearer token"`).

9. **Try Accessing Another User's Note — `GET /api/notes/:id`**
   - Register/login a second user (`user2@example.com`) and send `GET /api/notes/<USER1_NOTE_ID>` with `<USER2_TOKEN>`.
   - Expected: `403 Forbidden` (`"Forbidden: you do not have permission to access this note"`).

## 3. GitHub Upload Instructions
```bash
git init
git add .
git commit -m "Add Notes App JWT Backend"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
