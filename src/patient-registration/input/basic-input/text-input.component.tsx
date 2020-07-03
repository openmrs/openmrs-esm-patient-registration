import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface TextInputProps {
  label: string;
  placeholder: string;
  name: string;
}

export const TextInput: React.FunctionComponent<TextInputProps> = ({ label, name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field}>
      <label className={styles.label} htmlFor={field.name}>
        {label}
      </label>
      <input className={meta.touched && meta.error ? styles.errorInput : styles.input} type="text" {...field} />
      {meta.touched && meta.error ? <div className={styles.errorMessage}>{meta.error}</div> : null}
    </main>
  );
};
