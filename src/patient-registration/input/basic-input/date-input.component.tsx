import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface DateInputProps {
  name: string;
}

export const DateInput: React.FunctionComponent<DateInputProps> = ({ name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field}>
      <input
        className={meta.touched && meta.error ? styles.errorInput : styles.input}
        type="date"
        {...field}
        value={field.value !== null ? field.value : ''}
      />
      {meta.touched && meta.error ? <div className={styles.errorMessage}>{meta.error}</div> : null}
    </main>
  );
};
