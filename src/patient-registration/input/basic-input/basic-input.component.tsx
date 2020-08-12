import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface BasicInputProps {
  type: string;
  label: string;
  name: string;
  showLabel: boolean;
}

export const BasicInput: React.FC<BasicInputProps> = ({ type, label, name, showLabel }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {showLabel && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          {label}
        </label>
      )}
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${styles[type + 'Input']} ${
          styles.input
        }`}
        type={type}
        aria-label={label}
        {...field}
        //Needed for date input?
        //Can this cause problems for other inputs? (esp. checkbox)
        value={field.value !== null ? field.value : ''}
        checked={type === 'checkbox' ? field.value : null}
      />
      {meta.touched && meta.error && (
        <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
          {meta.error}
        </div>
      )}
    </main>
  );
};
