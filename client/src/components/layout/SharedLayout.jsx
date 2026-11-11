import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Header onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}
