import { NavLink } from 'react-router-dom';
import styles from './SidebarMenu.module.css';

const MENU_ITEMS = [
  { to: '/', icon: 'icon-grid', label: 'Dashboard', end: true },
  { to: '/orders', icon: 'icon-cart', label: 'Orders' },
  { to: '/products', icon: 'icon-flask', label: 'Products' },
  { to: '/suppliers', icon: 'icon-box', label: 'Suppliers' },
  { to: '/customers', icon: 'icon-users', label: 'Customers' },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <nav className={styles.menu}>
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onItemClick}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          aria-label={item.label}
        >
          <svg className={styles.icon}>
            <use href={`/sprite.svg#${item.icon}`} />
          </svg>
        </NavLink>
      ))}
    </nav>
  );
}
