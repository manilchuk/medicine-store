import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          className={`${styles.dot} ${p === page ? styles.active : ''}`}
          onClick={() => onChange(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
        />
      ))}
    </div>
  );
}
