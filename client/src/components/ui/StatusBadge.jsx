import styles from './StatusBadge.module.css';

const STATUS_CLASS_MAP = {
  completed: 'completed',
  confirmed: 'confirmed',
  pending: 'pending',
  cancelled: 'cancelled',
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  active: 'active',
  deactive: 'deactive',
  income: 'income',
  expense: 'expense',
  error: 'error',
};

export default function StatusBadge({ status }) {
  const key = STATUS_CLASS_MAP[status?.toLowerCase()] || 'default';
  return <span className={`${styles.badge} ${styles[key]}`}>{status}</span>;
}
