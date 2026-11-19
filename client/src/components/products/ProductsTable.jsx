import styles from './ProductsTable.module.css';

export default function ProductsTable({ products, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Product Info</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Stock</th>
            <th className={styles.th}>Suppliers</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className={styles.row}>
              <td className={styles.td}>
                <span className={styles.name}>{p.name}</span>
              </td>
              <td className={styles.td}>{p.category}</td>
              <td className={styles.td}>{String(p.stock).padStart(2, '0')}</td>
              <td className={styles.td}>{p.suppliers}</td>
              <td className={styles.td}>
                {Number(p.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => onEdit(p)}
                    aria-label={`Edit ${p.name}`}
                  >
                    <svg width="16" height="16">
                      <use href="/sprite.svg#icon-edit" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => onDelete(p)}
                    aria-label={`Delete ${p.name}`}
                  >
                    <svg width="16" height="16">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
