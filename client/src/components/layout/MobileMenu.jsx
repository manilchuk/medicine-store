import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useLogout } from '../../hooks/useLogout';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose }) {
  const logout = useLogout();
  const navigate = useNavigate();

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => navigate('/login', { replace: true }),
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
          <svg width="32" height="32">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <div className={styles.menuWrap}>
          <SidebarMenu onItemClick={onClose} />
        </div>

        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
          aria-label="Logout"
          disabled={logout.isPending}
        >
          <svg width="14" height="14">
            <use href="/sprite.svg#icon-logout" />
          </svg>
        </button>
      </div>
    </div>
  );
}
