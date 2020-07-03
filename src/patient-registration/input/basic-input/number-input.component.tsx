import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface NumberInputProps {
  label: string;
  name: string;
  subField: boolean;
}

export const NumberInput: React.FunctionComponent<NumberInputProps> = ({ label, name, subField }) => {
  const [field, meta] = useField(name);

  return (
    <main className={subField ? styles.subField : styles.field}>
      <label className={subField ? styles.subLabel : styles.label} htmlFor={field.name}>
        {label}
      </label>
      <input className={meta.touched && meta.error ? styles.errorInput : styles.input} type="number" {...field} />
      {meta.touched && meta.error ? <div className={styles.errorMessage}>{meta.error}</div> : null}
    </main>
  );
};
