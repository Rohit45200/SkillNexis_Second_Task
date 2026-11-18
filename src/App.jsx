import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import styles from './styles/Pages.module.css';

export default function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggleProduct = (productId) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleClearBag = () => {
    setSelectedIds([]);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar bagCount={selectedIds.length} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedIds={selectedIds}
                  onToggleProduct={handleToggleProduct}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  selectedIds={selectedIds}
                  onToggleProduct={handleToggleProduct}
                  onClearBag={handleClearBag}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className={styles.siteFooter}>
          <div className={styles.footerInner}>
            <span>StudioCraft · React Fundamentals Practice Application</span>
            <div className={styles.footerLinks}>
              <Link to="/" className={styles.footerLink}>Home</Link>
              <Link to="/products" className={styles.footerLink}>Products</Link>
              <Link to="/about" className={styles.footerLink}>About</Link>
              <Link to="/contact" className={styles.footerLink}>Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
