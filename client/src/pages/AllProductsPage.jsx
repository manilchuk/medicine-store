import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import TableSection from '../components/dashboard/TableSection';
import FilterBar from '../components/ui/FilterBar';
import Pagination from '../components/ui/Pagination';
import ProductsTable from '../components/products/ProductsTable';
import styles from './AllProductsPage.module.css';

export default function AllProductsPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useProducts({
    name: filter,
    page,
    limit: 5,
  });

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleEdit = (product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (product) => {
    console.log('Delete product:', product);
  };

  const hasProducts = !isLoading && !isError && data?.products.length > 0;

  return (
    <div className={styles.page}>
      <FilterBar placeholder="Product Name" onFilter={handleFilter}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => console.log('Open Add modal (Step 10.2)')}
        >
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
          <ProductsTable products={data.products} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </TableSection>

      {hasProducts && (
        <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
      )}
    </div>
  );
}
