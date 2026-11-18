# StudioCraft — React Fundamentals & Node.js REST API Suite

This repository contains the **React Fundamentals Practice Application** (root Vite + React.js frontend) alongside three standalone **Node.js + Express + MongoDB** REST API projects in `backend/`.

## Frontend: React Fundamentals Practice Application

### Features Implemented
1. **Task 1 — Product Information Component (`src/components/Product.jsx`)**: Reusable card displaying product image, name, category, price, availability, and description via props.
2. **Task 2 — Props & State (`src/components/Counter.jsx`)**: Receives `initialCount`, `step`, `minLimit`, and `maxLimit` as props from `Home.jsx` and manages changing counter state with `useState`.
3. **Task 3 — To-Do App (`src/components/TodoApp.jsx`)**: Add tasks, toggle completion, delete tasks, filter (`All` / `Active` / `Completed`), clear completed items, and display an empty state.
4. **Task 4 — React Router Navigation (`src/App.jsx`, `src/components/Navbar.jsx`)**: Client-side routing across **Home**, **Products**, **About**, and **Contact** without refreshing the browser.
5. **Task 5 — CSS Modules (`src/styles/*.module.css`)**: Component-scoped stylesheets for `Navbar`, `Product`, `Counter`, `TodoApp`, and `Pages`.

### Installation & Running Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Concept Reference
- **Props vs. State:** Props are read-only inputs passed from parent to child components, whereas State (`useState`) is mutable internal data owned by a component that triggers re-renders on update.
- **React Router:** Uses `BrowserRouter`, `Routes`, `Route`, and `NavLink` to synchronize UI views with the browser URL via the History API without full page reloads.
- **CSS Modules:** `.module.css` files scope class names locally per component at compile time, preventing style collisions across the application.

## Backend Projects (`backend/`)
- `backend/todo-api/` — To-Do List REST API (Express, Mongoose CRUD)
- `backend/auth-api/` — User Authentication REST API (`bcryptjs`, JWT, `/api/auth/profile`)
- `backend/notes-api/` — Notes App Backend with JWT & per-user ownership checks

Each backend directory includes its own `package.json`, `.env.example`, `.gitignore`, MVC source files, and a detailed `README.md` with Postman test cases.

## GitHub Upload Instructions
```bash
git init
git add .
git commit -m "Complete React Fundamentals app and Node.js REST APIs"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
