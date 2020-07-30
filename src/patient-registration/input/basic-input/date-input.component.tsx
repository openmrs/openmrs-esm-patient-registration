import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface DateInputProps {
  name: string;
}

export const DateInput: React.FC<DateInputProps> = ({ name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field}>
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${styles.dateInput}`}
        type="date"
        aria-label={field.name}
        {...field}
        value={field.value !== null ? field.value : ''}
      />
      {meta.touched && meta.error && (
        <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
          {meta.error}
        </div>
      )}
    </main>
  );
};
