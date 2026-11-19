import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Modal from '../ui/Modal';
import { supplierSchema, STATUSES } from '../../schemas/supplierSchema';
import styles from './SupplierFormModal.module.css';

const EMPTY_VALUES = {
  name: '',
  address: '',
  suppliers: '',
  date: null,
  amount: '',
  status: 'Active',
};

const DATE_FORMAT = 'MMMM D, YYYY';

export default function SupplierFormModal({
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
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(supplierSchema),
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && initialData) {
      reset({
        name: initialData.name,
        address: initialData.address,
        suppliers: initialData.suppliers,
        date: dayjs(initialData.date, DATE_FORMAT),
        amount: initialData.amount,
        status: initialData.status,
      });
    } else {
      reset(EMPTY_VALUES);
    }
  }, [open, isEdit, initialData, reset]);

  const submit = (data) => {
    onSubmit({
      name: data.name,
      address: data.address,
      suppliers: data.suppliers,
      date: dayjs(data.date).format(DATE_FORMAT),
      amount: data.amount,
      status: data.status,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit supplier' : 'Add a new supplier'}>
      <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
        <div className={styles.grid}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Suppliers Info"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name')}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Address"
              className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
              {...register('address')}
            />
            {errors.address && <span className={styles.error}>{errors.address.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Company"
              className={`${styles.input} ${errors.suppliers ? styles.inputError : ''}`}
              {...register('suppliers')}
            />
            {errors.suppliers && <span className={styles.error}>{errors.suppliers.message}</span>}
          </div>

          <div className={styles.field}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={DATE_FORMAT}
                  className={styles.datePicker}
                  slotProps={{
                    textField: {
                      placeholder: 'Delivery date',
                      error: Boolean(errors.date),
                      className: `${styles.datePickerField} ${field.value ? styles.filled : ''}`,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
            {errors.date && <span className={styles.error}>{errors.date.message}</span>}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Amount"
              className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
              {...register('amount')}
            />
            {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
          </div>

          <div className={styles.field}>
            <select
              className={`${styles.input} ${errors.status ? styles.inputError : ''}`}
              {...register('status')}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && <span className={styles.error}>{errors.status.message}</span>}
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
