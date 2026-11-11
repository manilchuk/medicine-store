import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';
import styles from './Header.module.css';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/orders': 'All orders',
  '/products': 'All products',
  '/suppliers': 'All suppliers',
  '/customers': 'All customers',
};

export default function Header({ onOpenMenu }) {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => navigate('/login', { replace: true }),
    });
  };

  return (
    <header className={styles.header}>
      <button type="button" className={styles.burger} onClick={onOpenMenu} aria-label="Open menu">
        <svg width="32" height="32">
          <use href="/sprite.svg#icon-menu" />
        </svg>
      </button>

      <img src="/favicon.svg" alt="E-Pharmacy" className={styles.logoIcon} />

      <div className={styles.info}>
        <h1 className={styles.title}>Medicine store</h1>
        <p className={styles.subtitle}>
          <Link to="/" className={styles.subLink}>
            {pageTitle}
          </Link>
          <span className={styles.divider}> | </span>
          <span className={styles.email}>{user?.email || ''}</span>
        </p>
      </div>

      <button
        type="button"
        className={styles.logout}
        onClick={handleLogout}
        aria-label="Logout"
        disabled={logout.isPending}
      >
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-logout" />
        </svg>
      </button>
    </header>
  );
}
