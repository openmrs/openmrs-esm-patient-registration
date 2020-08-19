import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

interface BasicInputProps {
  type: string;
  label?: string;
  name: string;
  showRequiredAsterisk?: boolean;
  placeholder?: string;
}

export const BasicInput: React.FC<BasicInputProps> = ({ type, label, name, showRequiredAsterisk, placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {label && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          <span>{label}</span>
          {showRequiredAsterisk && <span className={styles.requiredField}> *</span>}
        </label>
      )}
      <div>
        <input
          className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${
            styles[type + 'Input']
          } ${styles.input}`}
          type={type}
          aria-label={name}
          placeholder={placeholder}
          {...field}
          value={field.value !== null ? field.value : ''}
          checked={type === 'checkbox' ? field.value : null}
        />
        {meta.touched && meta.error && (
          <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
            {meta.error}
          </div>
        )}
      </div>
    </main>
  );
};
