import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

//To be deleted
//To be deleted
//To be deleted
interface TelephoneNumberInputProps {
  label: string;
  placeholder: string;
  name: string;
  showLabel: boolean;
}

export const TelephoneNumberInput: React.FC<TelephoneNumberInputProps> = ({ label, placeholder, name, showLabel }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {showLabel && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          {label}
        </label>
      )}
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${styles.phoneNumberInput} ${
          styles.input
        }`}
        type="tel"
        aria-label={label}
        placeholder={placeholder}
        {...field}
      />
      {meta.touched && meta.error && (
        <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
          {meta.error}
        </div>
      )}
    </main>
  );
};
