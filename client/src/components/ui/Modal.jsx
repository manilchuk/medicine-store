import Dialog from '@mui/material/Dialog';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, title, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        className: styles.paper,
      }}
      slotProps={{
        backdrop: {
          className: styles.backdrop,
        },
      }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </Dialog>
  );
}
