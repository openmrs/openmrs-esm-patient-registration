import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface NumberInputProps {
  label: string;
  name: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error ? styles.errorInput : null} ${styles.numberInput}`}
        type="number"
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className={`omrs-type-body-small ${styles.errorMessage}`}>{meta.error}</div>
      ) : null}
    </main>
  );
};
