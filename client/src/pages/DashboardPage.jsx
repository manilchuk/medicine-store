import { useDashboard } from '../hooks/useDashboard';
import StatCard from '../components/dashboard/StatCard';
import TableSection from '../components/dashboard/TableSection';
import RecentCustomersTable from '../components/dashboard/RecentCustomersTable';
import IncomeExpensesList from '../components/dashboard/IncomeExpensesList';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return <div className={styles.state}>Loading dashboard...</div>;
  }

  if (isError) {
    return (
      <div className={styles.state}>
        Failed to load dashboard: {error?.message || 'Unknown error'}
      </div>
    );
  }

  const { stats, recentCustomers, incomeExpenses } = data;

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon="icon-money" label="All products" value={stats.allProducts} />
        <StatCard icon="icon-group" label="All suppliers" value={stats.allSuppliers} />
        <StatCard icon="icon-group" label="All customers" value={stats.allCustomers} />
      </div>

      <div className={styles.tablesRow}>
        <TableSection title="Recent Customers">
          <RecentCustomersTable customers={recentCustomers} />
        </TableSection>

        <TableSection title="Income/Expenses" scrollable>
          <IncomeExpensesList items={incomeExpenses} />
        </TableSection>
      </div>
    </div>
  );
}
