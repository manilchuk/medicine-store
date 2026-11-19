import { useState } from 'react';
import { useSuppliers, useCreateSupplier, useUpdateSupplier } from '../hooks/useSuppliers';
import TableSection from '../components/dashboard/TableSection';
import FilterBar from '../components/ui/FilterBar';
import Pagination from '../components/ui/Pagination';
import SuppliersTable from '../components/suppliers/SuppliersTable';
import SupplierFormModal from '../components/suppliers/SupplierFormModal';
import styles from './AllSuppliersPage.module.css';

export default function AllSuppliersPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editingSupplier, setEditingSupplier] = useState(null);

  const { data, isLoading, isError, error } = useSuppliers({
    name: filter,
    page,
    limit: 5,
  });

  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleOpenCreate = () => {
    setFormMode('create');
    setEditingSupplier(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (supplier) => {
    setFormMode('edit');
    setEditingSupplier(supplier);
    setFormOpen(true);
  };

  const handleFormSubmit = (payload) => {
    if (formMode === 'edit' && editingSupplier) {
      updateMutation.mutate(
        { id: editingSupplier._id, payload },
        {
          onSuccess: () => {
            setFormOpen(false);
            setEditingSupplier(null);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const hasSuppliers = !isLoading && !isError && data?.suppliers.length > 0;
  const isFormPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className={styles.page}>
      <FilterBar placeholder="User Name" onFilter={handleFilter}>
        <button type="button" className={styles.addBtn} onClick={handleOpenCreate}>
          <span className={styles.addIcon}>
            <svg width="14" height="14">
              <use href="/sprite.svg#icon-plus" />
            </svg>
          </span>
          <span>Add a new supplier</span>
        </button>
      </FilterBar>

      <TableSection title="All suppliers" fullWidth>
        {isLoading ? (
          <div className={styles.state}>Loading...</div>
        ) : isError ? (
          <div className={styles.state}>Error: {error?.message}</div>
        ) : data.suppliers.length === 0 ? (
          <div className={styles.state}>No suppliers found</div>
        ) : (
          <SuppliersTable suppliers={data.suppliers} onEdit={handleOpenEdit} />
        )}
      </TableSection>

      {hasSuppliers && (
        <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
      )}

      <SupplierFormModal
        open={formOpen}
        mode={formMode}
        initialData={editingSupplier}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        isPending={isFormPending}
      />
    </div>
  );
}
