import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '../ui/Modal';
import { productSchema, CATEGORIES } from '../../schemas/productSchema';
import styles from './ProductFormModal.module.css';

const EMPTY_VALUES = {
  name: '',
  category: CATEGORIES[0],
  stock: '',
  suppliers: '',
  price: '',
};

export default function ProductFormModal({
  open,
  mode = 'create',
  initialData = null,
  onClose,
  onSubmit,
  isPending = false,
}) {
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        stock: initialData.stock,
        suppliers: initialData.suppliers,
        price: initialData.price,
      });
    } else {
      reset(EMPTY_VALUES);
    }
  }, [open, isEdit, initialData, reset]);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit product' : 'Add a new product'}>
      <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
        <div className={styles.grid}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Product Info"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name')}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.field}>
            <select
              className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
              {...register('category')}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <span className={styles.error}>{errors.category.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Stock"
              className={`${styles.input} ${errors.stock ? styles.inputError : ''}`}
              {...register('stock')}
            />
            {errors.stock && <span className={styles.error}>{errors.stock.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Suppliers"
              className={`${styles.input} ${errors.suppliers ? styles.inputError : ''}`}
              {...register('suppliers')}
            />
            {errors.suppliers && <span className={styles.error}>{errors.suppliers.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Price"
              className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
              {...register('price')}
            />
            {errors.price && <span className={styles.error}>{errors.price.message}</span>}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? 'Saving...' : isEdit ? 'Save' : 'Add'}
          </button>
          <button type="button" className={styles.cancel} onClick={onClose} disabled={isPending}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
