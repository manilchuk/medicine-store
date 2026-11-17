import styles from './StatCard.module.css';

export default function StatCard({ icon, label, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <svg className={styles.icon}>
          <use href={`/sprite.svg#${icon}`} />
        </svg>
        <span className={styles.label}>{label}</span>
      </div>
      <p className={styles.value}>{value.toLocaleString()}</p>
    </div>
  );
}
