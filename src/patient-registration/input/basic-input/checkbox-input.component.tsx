import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface CheckboxInputProps {
  label: string;
  name: string;
}

export const CheckboxInput: React.FunctionComponent<CheckboxInputProps> = ({ label, name }) => {
  const [field] = useField({ name });

  return (
    <main className={styles.checkboxField}>
      <label className={styles.label} htmlFor={field.name}>
        {label}
      </label>
      <input className={styles.input} type="checkbox" {...field} />
    </main>
  );
};
