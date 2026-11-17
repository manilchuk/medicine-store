import styles from './IncomeExpensesList.module.css';

const formatAmount = (amount) => {
  const abs = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (amount > 0) return `+${abs}`;
  if (amount < 0) return `-${abs}`;
  return abs;
};

export default function IncomeExpensesList({ items }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.subLabel}>Today</p>
      <ul className={styles.list}>
        {items.map((item) => {
          const isError = item.type === 'Error';
          const isIncome = item.type === 'Income';

          return (
            <li key={item._id} className={styles.item}>
              <span className={`${styles.badge} ${styles[item.type.toLowerCase()]}`}>
                {item.type}
              </span>
              <span className={styles.name}>{item.name}</span>
              <span
                className={`${styles.amount} ${
                  isError
                    ? styles.amountError
                    : isIncome
                      ? styles.amountIncome
                      : styles.amountExpense
                }`}
              >
                {formatAmount(item.amount)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
