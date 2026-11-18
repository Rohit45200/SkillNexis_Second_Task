import { useState } from 'react';
import styles from '../styles/Counter.module.css';

export default function Counter({
  title = 'Interactive Counter',
  subtitle = 'Initial values arrive via props; clicks update local component state.',
  initialCount = 0,
  step = 1,
  minLimit = 0,
  maxLimit = 25,
  onCountChange,
}) {
  const [count, setCount] = useState(initialCount);

  const updateCount = (nextValue) => {
    const clamped = Math.max(minLimit, Math.min(maxLimit, nextValue));
    setCount(clamped);
    if (onCountChange) {
      onCountChange(clamped);
    }
  };

  return (
    <section className={styles.panel} aria-labelledby="counter-heading">
      <div className={styles.header}>
        <span className={styles.kicker}>Task 02 · Props &amp; useState</span>
        <h2 id="counter-heading" className={styles.title}>
          {title}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.readoutBox}>
        <span className={styles.countValue} aria-live="polite">
          {count}
        </span>
        <span className={styles.limitMeta}>
          Range {minLimit} to {maxLimit} · Step +{step} / -{step}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => updateCount(count - step)}
          disabled={count <= minLimit}
        >
          Decrease (-{step})
        </button>

        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => updateCount(count + step)}
          disabled={count >= maxLimit}
        >
          Increase (+{step})
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => updateCount(initialCount)}
          disabled={count === initialCount}
        >
          Reset
        </button>
      </div>

      <div className={styles.inspector}>
        <div className={styles.inspectorItem}>
          <span className={styles.inspectorLabel}>Received Prop (initialCount)</span>
          <span className={styles.inspectorValue}>{initialCount}</span>
        </div>
        <div className={styles.inspectorItem}>
          <span className={styles.inspectorLabel}>Local State (count)</span>
          <span className={styles.inspectorValue}>{count}</span>
        </div>
      </div>
    </section>
  );
}
