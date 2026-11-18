import { useState } from 'react';
import styles from '../styles/TodoApp.module.css';

const INITIAL_TASKS = [
  { id: 1, text: 'Build reusable Product component with props', completed: true },
  { id: 2, text: 'Wire React Router pages without page refresh', completed: false },
  { id: 3, text: 'Verify CSS Modules scoped class names', completed: false },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setErrorMessage('Please enter a task description before adding.');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInputValue('');
    setErrorMessage('');
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className={styles.panel} aria-labelledby="todo-heading">
      <div className={styles.header}>
        <div>
          <span className={styles.kicker}>Task 03 · Stateful To-Do List</span>
          <h2 id="todo-heading" className={styles.title}>
            Practice Task Manager
          </h2>
        </div>
        <span className={styles.summary}>
          {remainingCount} active · {completedCount} done
        </span>
      </div>

      <form onSubmit={handleAddTask} className={styles.form} noValidate>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          placeholder="Add a practice task..."
          aria-label="New task title"
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn}>
          Add Task
        </button>
      </form>

      {errorMessage && (
        <p className={styles.errorText} role="alert">
          {errorMessage}
        </p>
      )}

      <div className={styles.toolbar}>
        <div className={styles.filterGroup} role="group" aria-label="Filter tasks">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={
                filter === tab.key
                  ? `${styles.filterBtn} ${styles.filterBtnActive}`
                  : styles.filterBtn
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleClearCompleted}
          disabled={completedCount === 0}
          className={styles.clearBtn}
        >
          Clear Completed
        </button>
      </div>

      {visibleTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>
            {tasks.length === 0
              ? 'No tasks in your list yet'
              : `No ${filter} tasks found`}
          </p>
          <p className={styles.emptyDesc}>
            {tasks.length === 0
              ? 'Enter a task title above and select Add Task to begin.'
              : 'Switch filters above or add a new task.'}
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {visibleTasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className={styles.checkbox}
                />
                <span
                  className={
                    task.completed
                      ? `${styles.taskText} ${styles.taskTextCompleted}`
                      : styles.taskText
                  }
                >
                  {task.text}
                </span>
              </label>
              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                className={styles.deleteBtn}
                aria-label={`Delete task: ${task.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
