import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface NumberInputProps {
  label: string;
  name: string;
}

export const NumberInput: React.FunctionComponent<NumberInputProps> = ({ label, name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field}>
      <label className={styles.label} htmlFor={field.name}>
        {label}
      </label>
      <input className={meta.touched && meta.error ? styles.errorInput : styles.input} type="number" {...field} />
      {meta.touched && meta.error ? (
        <div className={`omrs-type-body-small ${styles.errorMessage}`}>{meta.error}</div>
      ) : null}
    </main>
  );
};
