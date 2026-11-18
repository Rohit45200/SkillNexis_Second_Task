import { useState } from 'react';
import Product from '../components/Product';
import { PRODUCTS_CATALOG } from '../data/productsData';
import styles from '../styles/Pages.module.css';

const CATEGORIES = ['All', 'Peripherals', 'Audio', 'Lighting', 'Deskware'];

export default function Products({ selectedIds, onToggleProduct, onClearBag }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS_CATALOG
      : PRODUCTS_CATALOG.filter((item) => item.category === activeCategory);

  const selectedItems = PRODUCTS_CATALOG.filter((item) =>
    selectedIds.includes(item.id)
  );
  const bagTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Product Hardware Catalog</h1>
          <p className={styles.sectionSubtitle}>
            Each card is rendered by the reusable Product component receiving image,
            name, price, category, and description through React props.
          </p>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.segmentedBar} role="group" aria-label="Filter by category">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? `${styles.segmentBtn} ${styles.segmentBtnActive}`
                  : styles.segmentBtn
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.bagSummary}>
          <span>{selectedItems.length} selected</span>
          <span aria-hidden="true">·</span>
          <span className={styles.bagTotal}>${bagTotal.toFixed(2)}</span>
          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={onClearBag}
              className={styles.clearBagBtn}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            category={product.category}
            availability={product.availability}
            isSelected={selectedIds.includes(product.id)}
            onSelect={() => onToggleProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
