import styles from './UserAvatar.module.css';

const COLORS = ['#59b17a', '#8059e4', '#f79042', '#70a6e8', '#e85050', '#0ea5e9'];

const getColor = (name = '') => {
  const idx = (name.charCodeAt(0) || 0) % COLORS.length;
  return COLORS[idx];
};

export default function UserAvatar({ src, alt = '' }) {
  const initials = alt
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.fallback} style={{ backgroundColor: getColor(alt) }} aria-label={alt}>
      {initials ? (
        <span className={styles.initials}>{initials}</span>
      ) : (
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-user-placeholder" />
        </svg>
      )}
    </div>
  );
}
