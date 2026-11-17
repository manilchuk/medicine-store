import UserAvatar from './UserAvatar';
import styles from './RecentCustomersTable.module.css';

export default function RecentCustomersTable({ customers }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Spent</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c._id} className={styles.row}>
            <td className={styles.td}>
              <div className={styles.user}>
                <UserAvatar src={c.avatar} alt={c.name} />
                <span className={styles.name}>{c.name}</span>
              </div>
            </td>
            <td className={styles.td}>{c.email}</td>
            <td className={styles.td}>
              {c.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
