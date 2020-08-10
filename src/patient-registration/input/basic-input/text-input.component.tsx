import React from 'react';
import { useField } from 'formik';
import styles from './../input.css';

interface TextInputProps {
  label: string;
  placeholder: string;
  name: string;
  showLabel: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ label, name, placeholder, showLabel }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {showLabel && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          {label}
        </label>
      )}
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${styles.input} ${
          styles.textInput
        }`}
        type="text"
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
