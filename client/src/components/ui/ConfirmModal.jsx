import Modal from './Modal';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.confirm} onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <button type="button" className={styles.cancel} onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
