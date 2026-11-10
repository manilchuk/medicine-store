import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ children }) {
  if (!children) return null;
  return <p className={styles.error}>{children}</p>;
}
