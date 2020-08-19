import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

interface DateInputProps {
  label: string;
  name: string;
  showLabel: boolean;
  labelRequired: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({ label, name, showLabel, labelRequired }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {showLabel && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          <span>{label}</span>
          {labelRequired && <span className={styles.requiredField}> *</span>}
        </label>
      )}
      <div>
        <input
          className={`omrs-input-outlined ${meta.touched && meta.error && styles.errorInput} ${styles.dateInput} ${
            styles.input
            }`}
          type="date"
          aria-label={label}
          {...field}
          value={field.value !== null ? field.value : ''}
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
