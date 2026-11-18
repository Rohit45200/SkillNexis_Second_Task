import { useState } from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import TodoApp from '../components/TodoApp';
import Product from '../components/Product';
import { HERO_STUDIO_IMAGE, PRODUCTS_CATALOG } from '../data/productsData';
import styles from '../styles/Pages.module.css';

export default function Home({ selectedIds, onToggleProduct }) {
  const [stepSize, setStepSize] = useState(1);
  const [lastReportedCount, setLastReportedCount] = useState(2);

  const featuredProducts = PRODUCTS_CATALOG.slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroGrid}>
        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            <span>Week 2 Practice Suite</span>
            <span aria-hidden="true">·</span>
            <span>React Router &amp; CSS Modules</span>
          </div>

          <h1 className={styles.heroTitle}>
            Component Architecture &amp; Stateful UI Practice
          </h1>

          <p className={styles.heroLead}>
            A structured React.js application demonstrating reusable props-driven
            product cards, parent-to-child state synchronization, a stateful to-do
            manager, client-side routing, and scoped CSS Modules.
          </p>

          <div className={styles.heroActions}>
            <Link to="/products" className={styles.primaryBtn}>
              Explore Product Catalog
            </Link>
            <Link to="/about" className={styles.secondaryBtn}>
              Architecture &amp; API Docs
            </Link>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img
            src={HERO_STUDIO_IMAGE}
            alt="Minimalist industrial design workspace with desk lamp, keyboard, and ceramic mug"
            className={styles.heroImg}
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="workspace-heading">
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="workspace-heading" className={styles.sectionTitle}>
              Interactive State &amp; Task Workspace
            </h2>
            <p className={styles.sectionSubtitle}>
              Test parent-to-child prop passing alongside independent local state
              updates. Parent reported count: {lastReportedCount}.
            </p>
          </div>

          <div className={styles.segmentedBar} role="group" aria-label="Counter step size">
            {[1, 2, 5].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setStepSize(step)}
                className={
                  stepSize === step
                    ? `${styles.segmentBtn} ${styles.segmentBtnActive}`
                    : styles.segmentBtn
                }
              >
                Step {step}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.twoColGrid}>
          <Counter
            title="Desk Allocation Counter"
            subtitle="Step size and initialCount flow down as props from Home."
            initialCount={2}
            step={stepSize}
            minLimit={0}
            maxLimit={25}
            onCountChange={setLastReportedCount}
          />
          <TodoApp />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="featured-heading">
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="featured-heading" className={styles.sectionTitle}>
              Featured Hardware Components
            </h2>
            <p className={styles.sectionSubtitle}>
              Task 01 reusable Product cards rendered from structured catalog props.
            </p>
          </div>
          <Link to="/products" className={styles.secondaryBtn}>
            View All Products
          </Link>
        </div>

        <div className={styles.productGrid}>
          {featuredProducts.map((item) => (
            <Product
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
              category={item.category}
              availability={item.availability}
              isSelected={selectedIds.includes(item.id)}
              onSelect={() => onToggleProduct(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
