# To-Do List REST API

A complete, beginner-friendly To-Do List REST API built with Node.js, Express.js, MongoDB, and Mongoose using a clean MVC architecture.

## Tech Stack
- Node.js & Express.js (CommonJS)
- MongoDB & Mongoose
- dotenv & cors

## Folder Structure
```text
todo-api/
  config/db.js
  controllers/taskController.js
  middleware/errorMiddleware.js
  models/Task.js
  routes/taskRoutes.js
  .env.example
  .gitignore
  package.json
  server.js
  README.md
```

## 1. Installation
```bash
cd backend/todo-api
npm install
```

## 2. MongoDB Connection Instructions
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update `MONGO_URI` in `.env`:
   - **Local MongoDB:** `mongodb://127.0.0.1:27017/todo_rest_api`
   - **MongoDB Atlas:** `mongodb+srv://<username>:<password>@<cluster-url>/todo_rest_api?retryWrites=true&w=majority`

## 3. Running the Server
```bash
# Production mode
npm start

# Development mode (auto-restart with nodemon)
npm run dev
```

## 4. Postman Testing Guide

Base URL: `http://localhost:5000`

### A. Create a Task — `POST /api/tasks`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Finish Express MVC assignment",
  "description": "Implement Task model, controller, and routes",
  "completed": false
}
```
- **Expected Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
    "title": "Finish Express MVC assignment",
    "description": "Implement Task model, controller, and routes",
    "completed": false,
    "createdAt": "2026-11-18T16:00:00.000Z",
    "updatedAt": "2026-11-18T16:00:00.000Z",
    "__v": 0
  }
}
```

### B. Get All Tasks — `GET /api/tasks`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
      "title": "Finish Express MVC assignment",
      "description": "Implement Task model, controller, and routes",
      "completed": false,
      "createdAt": "2026-11-18T16:00:00.000Z",
      "updatedAt": "2026-11-18T16:00:00.000Z"
    }
  ]
}
```

### C. Get Single Task by ID — `GET /api/tasks/:id`
- Replace `:id` with a valid MongoDB ObjectId (e.g. `65f1b2c3d4e5f6a7b8c9d0e1`).
- **Expected Response (`200 OK`):** Single task JSON object.
- **Invalid ID (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Invalid task ID format"
}
```

### D. Update a Task — `PUT /api/tasks/:id`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "completed": true
}
```
- **Expected Response (`200 OK`):** Updated task JSON with `completed: true`.

### E. Delete a Task — `DELETE /api/tasks/:id`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "65f1b2c3d4e5f6a7b8c9d0e1",
    "title": "Finish Express MVC assignment",
    "completed": true
  }
}
```

## 5. Common Errors & Solutions
- **`MONGO_URI is not defined`**: Make sure you created a `.env` file from `.env.example`.
- **`ECONNREFUSED 127.0.0.1:27017`**: Local MongoDB service is not running. Start `mongod` or switch to a MongoDB Atlas connection string.
- **`400 Invalid task ID format`**: Ensure `:id` is a valid 24-character hexadecimal MongoDB ObjectId.
- **`400 Please provide a valid task title`**: Include a non-empty `title` string in `POST /api/tasks`.
