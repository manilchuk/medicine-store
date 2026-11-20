import UserAvatar from '../dashboard/UserAvatar';
import styles from './CustomersTable.module.css';

export default function CustomersTable({ customers, onRowClick }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>User Info</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Register date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c._id}
              className={styles.row}
              onClick={() => onRowClick(c)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick(c);
                }
              }}
            >
              <td className={styles.td}>
                <div className={styles.user}>
                  <UserAvatar src={c.avatar} alt={c.name} />
                  <span className={styles.name}>{c.name}</span>
                </div>
              </td>
              <td className={styles.td}>{c.email}</td>
              <td className={styles.td}>{c.address}</td>
              <td className={styles.td}>{c.phone}</td>
              <td className={styles.td}>{c.register_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
