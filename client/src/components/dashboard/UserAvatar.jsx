import { useState } from 'react';
import styles from './UserAvatar.module.css';

export default function UserAvatar({ src, alt = '' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={styles.fallback} aria-label={alt}>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-user-placeholder" />
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={styles.avatar} onError={() => setHasError(true)} />;
}
