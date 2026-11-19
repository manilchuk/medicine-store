import { useState } from 'react';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../hooks/useProducts';
import TableSection from '../components/dashboard/TableSection';
import FilterBar from '../components/ui/FilterBar';
import Pagination from '../components/ui/Pagination';
import ProductsTable from '../components/products/ProductsTable';
import ProductFormModal from '../components/products/ProductFormModal';
import ConfirmModal from '../components/ui/ConfirmModal';
import styles from './AllProductsPage.module.css';

export default function AllProductsPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const { data, isLoading, isError, error } = useProducts({
    name: filter,
    page,
    limit: 5,
  });

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleOpenCreate = () => {
    setFormMode('create');
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setFormMode('edit');
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleFormSubmit = (payload) => {
    if (formMode === 'edit' && editingProduct) {
      updateMutation.mutate(
        { id: editingProduct._id, payload },
        {
          onSuccess: () => {
            setFormOpen(false);
            setEditingProduct(null);
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

  const handleOpenDelete = (product) => {
    setDeletingProduct(product);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    deleteMutation.mutate(deletingProduct._id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setDeletingProduct(null);
      },
    });
  };

  const hasProducts = !isLoading && !isError && data?.products.length > 0;
  const isFormPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className={styles.page}>
      <FilterBar placeholder="Product Name" onFilter={handleFilter}>
        <button type="button" className={styles.addBtn} onClick={handleOpenCreate}>
          <span className={styles.addIcon}>
            <svg width="14" height="14">
              <use href="/sprite.svg#icon-plus" />
            </svg>
          </span>
          <span>Add a new product</span>
        </button>
      </FilterBar>

      <TableSection title="All products" fullWidth>
        {isLoading ? (
          <div className={styles.state}>Loading...</div>
        ) : isError ? (
          <div className={styles.state}>Error: {error?.message}</div>
        ) : data.products.length === 0 ? (
          <div className={styles.state}>No products found</div>
        ) : (
          <ProductsTable
            products={data.products}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </TableSection>

      {hasProducts && (
        <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
      )}

      <ProductFormModal
        open={formOpen}
        mode={formMode}
        initialData={editingProduct}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        isPending={isFormPending}
      />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
        title="Delete product"
        message={`Are you sure you want to delete "${deletingProduct?.name || ''}"? This action cannot be undone.`}
      />
    </div>
  );
}
