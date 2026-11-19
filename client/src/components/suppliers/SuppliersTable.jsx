import StatusBadge from '../ui/StatusBadge';
import styles from './SuppliersTable.module.css';

export default function SuppliersTable({ suppliers, onEdit }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Suppliers Info</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Company</th>
            <th className={styles.th}>Delivery date</th>
            <th className={styles.th}>Amount</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id} className={styles.row}>
              <td className={styles.td}>
                <span className={styles.name}>{s.name}</span>
              </td>
              <td className={styles.td}>{s.address}</td>
              <td className={styles.td}>{s.suppliers}</td>
              <td className={styles.td}>{s.date}</td>
              <td className={styles.td}>
                {Number(s.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={styles.td}>
                <StatusBadge status={s.status} />
              </td>
              <td className={styles.td}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => onEdit(s)}
                  aria-label={`Edit ${s.name}`}
                >
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-edit" />
                  </svg>
                  <span>Edit</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
