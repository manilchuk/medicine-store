import { useState } from 'react';
import { useCustomers, useCustomerById } from '../hooks/useCustomers';
import TableSection from '../components/dashboard/TableSection';
import FilterBar from '../components/ui/FilterBar';
import Pagination from '../components/ui/Pagination';
import CustomersTable from '../components/customers/CustomersTable';
import CustomerDetailsModal from '../components/customers/CustomerDetailsModal';
import styles from './CustomersDataPage.module.css';

export default function CustomersDataPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isError, error } = useCustomers({
    name: filter,
    page,
    limit: 5,
  });

  const {
    data: details,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useCustomerById(selectedId);

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleRowClick = (customer) => {
    setSelectedId(customer._id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const hasCustomers = !isLoading && !isError && data?.customers.length > 0;

  return (
    <div className={styles.page}>
      <FilterBar placeholder="User Name" onFilter={handleFilter} />

      <TableSection title="Customers Data" fullWidth>
        {isLoading ? (
          <div className={styles.state}>Loading...</div>
        ) : isError ? (
          <div className={styles.state}>Error: {error?.message}</div>
        ) : data.customers.length === 0 ? (
          <div className={styles.state}>No customers found</div>
        ) : (
          <CustomersTable customers={data.customers} onRowClick={handleRowClick} />
        )}
      </TableSection>

      {hasCustomers && (
        <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
      )}

      <CustomerDetailsModal
        open={Boolean(selectedId)}
        onClose={handleCloseModal}
        data={details}
        isLoading={isDetailsLoading}
        isError={isDetailsError}
        error={detailsError}
      />
    </div>
  );
}
