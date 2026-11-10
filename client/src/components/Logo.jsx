import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo({ asLink = true }) {
  const content = (
    <>
      <img src="/favicon.svg" alt="E-Pharmacy" className={styles.icon} />
      <span className={styles.text}>E-Pharmacy</span>
    </>
  );

  if (asLink) {
    return (
      <Link to="/" className={styles.logo}>
        {content}
      </Link>
    );
  }

  return <div className={styles.logo}>{content}</div>;
}
