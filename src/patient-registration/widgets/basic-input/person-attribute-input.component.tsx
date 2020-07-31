import React from 'react';
import { useField } from 'formik';
import styles from './input.css';

interface PersonAttributeInputProps {
  label: string;
  placeholder: string;
  name: string;
  id: string;
}

export const PersonAttributeInput: React.FC<PersonAttributeInputProps> = ({ id, label, placeholder, name }) => {
  const [field, meta] = useField(name);

  return (
    <main className={styles.field} key={id}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`omrs-input-outlined ${meta.touched && meta.error ? styles.errorInput : null} ${
          styles.phoneNumberInput
        }`}
        type="text"
        aria-label={field.name}
        placeholder={placeholder}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div key={id} className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
          {meta.error}
        </div>
      ) : null}
    </main>
  );
};
