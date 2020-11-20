import React from 'react';
import { useField } from 'formik';
import styles from './../../input.scss';

interface InputProps {
  type: string;
  label?: string;
  name: string;
  showRequiredAsterisk?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  showRequiredAsterisk,
  placeholder,
  required,
  disabled = false,
  helperText,
}) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.fieldRow}>
      {label && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          <span>{label}</span>
          {(showRequiredAsterisk || required) && <span className={styles.requiredField}> *</span>}
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
          disabled={disabled}
          {...field}
          value={field.value || ''}
          checked={type === 'checkbox' ? field.value : null}
          required={required}
        />
        {meta.touched && meta.error && (
          <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
            {meta.error}
          </div>
        )}
        {helperText && type === 'text' && (
          <div>
            <span className="omrs-input-helper">{helperText}</span>
          </div>
        )}
      </div>
    </main>
  );
};
