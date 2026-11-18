import { useState } from 'react';
import styles from '../styles/Pages.module.css';

const BACKEND_PROJECTS = {
  todo: {
    title: 'To-Do List REST API (backend/todo-api)',
    summary: 'Express.js + Mongoose CRUD API for task creation, listing, updates, and deletion with MongoDB ObjectId validation.',
    routes: [
      { method: 'POST', path: '/api/tasks', access: 'Public', desc: 'Create a new task with title, description, and completed status' },
      { method: 'GET', path: '/api/tasks', access: 'Public', desc: 'Fetch all tasks sorted by newest first' },
      { method: 'GET', path: '/api/tasks/:id', access: 'Public', desc: 'Fetch a single task by MongoDB ID' },
      { method: 'PUT', path: '/api/tasks/:id', access: 'Public', desc: 'Update task title, description, or completion flag' },
      { method: 'DELETE', path: '/api/tasks/:id', access: 'Public', desc: 'Delete an existing task by ID' },
    ],
  },
  auth: {
    title: 'User Authentication REST API (backend/auth-api)',
    summary: 'Secure registration, bcryptjs password hashing, JWT issuance, and protected profile retrieval via Bearer token middleware.',
    routes: [
      { method: 'POST', path: '/api/auth/register', access: 'Public', desc: 'Validate input, prevent duplicate email, hash password, create user' },
      { method: 'POST', path: '/api/auth/login', access: 'Public', desc: 'Verify email and bcrypt password hash, return signed JWT' },
      { method: 'GET', path: '/api/auth/profile', access: 'Protected (JWT)', desc: 'Decode Bearer token in middleware and return safe user profile' },
    ],
  },
  notes: {
    title: 'Notes App Backend with JWT (backend/notes-api)',
    summary: 'Multi-user Notes API where JWT middleware enforces strict per-user ownership on every read, update, and delete.',
    routes: [
      { method: 'POST', path: '/api/auth/register', access: 'Public', desc: 'Register user account with hashed password' },
      { method: 'POST', path: '/api/auth/login', access: 'Public', desc: 'Authenticate user and issue JWT token' },
      { method: 'POST', path: '/api/notes', access: 'Protected (JWT)', desc: 'Create note bound to req.user.id from verified JWT' },
      { method: 'GET', path: '/api/notes', access: 'Protected (JWT)', desc: 'Return only notes belonging to authenticated user' },
      { method: 'GET', path: '/api/notes/:id', access: 'Protected (Owner)', desc: 'Fetch single note after verifying ownership' },
      { method: 'PUT', path: '/api/notes/:id', access: 'Protected (Owner)', desc: 'Update note title or content if owned by user' },
      { method: 'DELETE', path: '/api/notes/:id', access: 'Protected (Owner)', desc: 'Delete note if owned by authenticated user' },
    ],
  },
};

export default function About() {
  const [activeApi, setActiveApi] = useState('todo');
  const selectedApi = BACKEND_PROJECTS[activeApi];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Architecture &amp; Core Concepts</h1>
          <p className={styles.sectionSubtitle}>
            A breakdown of the React fundamentals implemented in this application
            alongside the three Node.js REST API modules in the repository.
          </p>
        </div>
      </div>

      <div className={styles.conceptGrid}>
        <article className={styles.conceptCard}>
          <h2 className={styles.conceptTitle}>Props vs. State</h2>
          <p className={styles.conceptText}>
            <strong>Props</strong> are read-only inputs passed from a parent
            component to a child component (such as product details or initial
            counter step size). <strong>State</strong> (managed via{' '}
            <code>useState</code>) is mutable data owned inside a component that
            triggers a re-render when updated.
          </p>
          <pre className={styles.codeBlock}>
{`<Counter initialCount={2} step={stepSize} />
const [count, setCount] = useState(initialCount);`}
          </pre>
        </article>

        <article className={styles.conceptCard}>
          <h2 className={styles.conceptTitle}>React Router DOM</h2>
          <p className={styles.conceptText}>
            <code>BrowserRouter</code>, <code>Routes</code>, and{' '}
            <code>NavLink</code> intercept browser URL changes using the HTML5
            History API so switching between Home, Products, About, and Contact
            happens instantaneously without a full page reload.
          </p>
          <pre className={styles.codeBlock}>
{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
</Routes>`}
          </pre>
        </article>

        <article className={styles.conceptCard}>
          <h2 className={styles.conceptTitle}>CSS Modules</h2>
          <p className={styles.conceptText}>
            Files ending in <code>.module.css</code> automatically scope class
            names locally to each component at build time. This prevents global
            naming collisions between components like <code>Navbar</code>,{' '}
            <code>Product</code>, and <code>TodoApp</code>.
          </p>
          <pre className={styles.codeBlock}>
{`import styles from '../styles/Product.module.css';
<article className={styles.card}>...</article>`}
          </pre>
        </article>
      </div>

      <section className={styles.section} aria-labelledby="backend-docs-heading">
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="backend-docs-heading" className={styles.sectionTitle}>
              Backend REST API Assignments
            </h2>
            <p className={styles.sectionSubtitle}>
              Complete MVC Node.js, Express, and MongoDB projects included under{' '}
              <code>backend/</code> with Mongoose schemas, JWT security, and Postman guides.
            </p>
          </div>

          <div className={styles.segmentedBar} role="group" aria-label="Select backend API">
            {[
              { key: 'todo', label: 'To-Do API' },
              { key: 'auth', label: 'User Auth API' },
              { key: 'notes', label: 'Notes JWT API' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveApi(tab.key)}
                className={
                  activeApi === tab.key
                    ? `${styles.segmentBtn} ${styles.segmentBtnActive}`
                    : styles.segmentBtn
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.sectionSubtitle} style={{ marginBottom: '1.25rem' }}>
          <strong>{selectedApi.title}</strong> — {selectedApi.summary}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className={styles.apiTable}>
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Access</th>
                <th>Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {selectedApi.routes.map((route) => (
                <tr key={`${route.method}-${route.path}`}>
                  <td className={styles.methodText}>{route.method}</td>
                  <td className={styles.pathText}>{route.path}</td>
                  <td>{route.access}</td>
                  <td>{route.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
