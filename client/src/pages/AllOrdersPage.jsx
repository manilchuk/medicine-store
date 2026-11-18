import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import TableSection from '../components/dashboard/TableSection';
import FilterBar from '../components/ui/FilterBar';
import OrdersTable from '../components/orders/OrdersTable';
import Pagination from '../components/ui/Pagination';
import styles from './AllOrdersPage.module.css';

export default function AllOrdersPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useOrders({
    name: filter,
    page,
    limit: 5,
  });

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const hasOrders = !isLoading && !isError && data?.orders.length > 0;

  return (
    <div className={styles.page}>
      <FilterBar placeholder="User Name" onFilter={handleFilter} />

      <TableSection title="All orders" fullWidth>
        {isLoading ? (
          <div className={styles.state}>Loading...</div>
        ) : isError ? (
          <div className={styles.state}>Error: {error?.message}</div>
        ) : data.orders.length === 0 ? (
          <div className={styles.state}>No orders found</div>
        ) : (
          <OrdersTable orders={data.orders} />
        )}
      </TableSection>

      {hasOrders && <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />}
    </div>
  );
}
