import styles from './TableSection.module.css';

export default function TableSection({ title, children, scrollable = false }) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={`${styles.body} ${scrollable ? styles.scrollable : ''}`}>{children}</div>
    </section>
  );
}
