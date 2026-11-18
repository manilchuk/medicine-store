import { useState } from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({ placeholder, onFilter, children }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(value.trim());
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <div className={styles.left}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className={styles.filterBtn}>
          <svg width="14" height="14" className={styles.filterIcon}>
            <use href="/sprite.svg#icon-filter" />
          </svg>
          <span>Filter</span>
        </button>
      </div>
      {children && <div className={styles.right}>{children}</div>}
    </form>
  );
}
