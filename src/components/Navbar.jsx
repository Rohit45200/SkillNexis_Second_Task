import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

export default function Navbar({ bagCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Zone 1: Single-line brand wordmark */}
        <NavLink to="/" className={styles.brand} onClick={closeMenu}>
          StudioCraft
        </NavLink>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className={styles.actionWrap}>
          <NavLink to="/products" className={styles.primaryCta}>
            {bagCount > 0 ? `Selected (${bagCount})` : 'Browse Products'}
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={
          menuOpen ? `${styles.mobileDrawer} ${styles.mobileDrawerOpen}` : styles.mobileDrawer
        }
      >
        <nav className={styles.mobileNavList} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}`
                  : styles.mobileNavLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
