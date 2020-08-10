import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

interface CheckboxInputProps {
  label: string;
  name: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name }) => {
  const [field] = useField({ name });

  return (
    <main className={styles.checkboxField}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`omrs-checkbox ${styles.checkboxInput} ${styles.input}`}
        type="checkbox"
        checked={field.value}
        aria-label={label}
        {...field}
      />
    </main>
  );
};
