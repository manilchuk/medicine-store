import UserAvatar from '../dashboard/UserAvatar';
import StatusBadge from '../ui/StatusBadge';
import styles from './OrdersTable.module.css';

export default function OrdersTable({ orders }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>User Info</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Products</th>
            <th className={styles.th}>Order date</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className={styles.row}>
              <td className={styles.td}>
                <div className={styles.user}>
                  <UserAvatar src={o.photo} alt={o.name} />
                  <span className={styles.name}>{o.name}</span>
                </div>
              </td>
              <td className={styles.td}>{o.address}</td>
              <td className={styles.td}>{String(o.products).padStart(2, '0')}</td>
              <td className={styles.td}>{o.order_date}</td>
              <td className={styles.td}>
                {Number(o.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={styles.td}>
                <StatusBadge status={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
