import { useState } from 'react';
import { Package } from 'lucide-react';
import styles from '../styles/Product.module.css';

export default function Product({
  image,
  name,
  price,
  description,
  category = 'Hardware',
  availability = 'In Stock',
  isSelected = false,
  onSelect,
}) {
  const [imgError, setImgError] = useState(false);

  const formattedPrice =
    typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <article className={styles.card}>
      <div className={styles.mediaBox}>
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.fallbackMedia}>
            <Package size={28} strokeWidth={1.5} />
            <span>{name}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{category}</span>
          <span className={styles.price}>{formattedPrice}</span>
        </div>

        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.availability}>{availability}</span>
          {onSelect && (
            <button
              type="button"
              onClick={onSelect}
              className={
                isSelected ? `${styles.button} ${styles.buttonAdded}` : styles.button
              }
            >
              {isSelected ? 'Added to Bag' : 'Add to Bag'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
