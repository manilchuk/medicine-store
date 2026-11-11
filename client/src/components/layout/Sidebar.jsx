import SidebarMenu from './SidebarMenu';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <SidebarMenu />
    </aside>
  );
}
