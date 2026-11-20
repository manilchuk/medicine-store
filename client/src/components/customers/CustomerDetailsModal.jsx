import Modal from '../ui/Modal';
import UserAvatar from '../dashboard/UserAvatar';
import styles from './CustomerDetailsModal.module.css';

export default function CustomerDetailsModal({ open, onClose, data, isLoading, isError, error }) {
  return (
    <Modal open={open} onClose={onClose} title="Customer details">
      {isLoading ? (
        <p className={styles.state}>Loading...</p>
      ) : isError ? (
        <p className={styles.state}>Error: {error?.message}</p>
      ) : data ? (
        <div className={styles.content}>
          <div className={styles.profile}>
            <UserAvatar src={data.customer.avatar} alt={data.customer.name} />
            <div>
              <p className={styles.name}>{data.customer.name}</p>
              <p className={styles.email}>{data.customer.email}</p>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>{data.customer.address}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>{data.customer.phone}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Register date</span>
              <span className={styles.value}>{data.customer.register_date}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Spent</span>
              <span className={styles.value}>
                {Number(data.customer.spent).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className={styles.ordersSection}>
            <h3 className={styles.ordersTitle}>Orders ({data.orders.length})</h3>
            {data.orders.length === 0 ? (
              <p className={styles.empty}>No orders yet.</p>
            ) : (
              <ul className={styles.ordersList}>
                {data.orders.map((o) => (
                  <li key={o._id} className={styles.orderItem}>
                    <span className={styles.orderDate}>{o.order_date}</span>
                    <span className={styles.orderPrice}>
                      {Number(o.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
