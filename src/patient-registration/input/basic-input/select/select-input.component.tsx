import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

interface SelectInputProps {
  name: string;
  options: Array<string>;
  label: string;
  showLabel: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, options, label, showLabel }) => {
  const [field, meta] = useField(name);
  const selectOptions = [
    <option key="" value="" disabled>
      Select {name}
    </option>,
    options.map(currentOption => (
      <option key={currentOption} value={currentOption}>
        {currentOption}
      </option>
    )),
  ];

  return (
    <main className={styles.fieldRow}>
      {showLabel && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          {label}
        </label>
      )}
      <select
        className={`omrs-dropdown omrs-type-body-regular ${meta.touched && meta.error && styles.errorInput} ${
          styles.input
        } ${styles.selectInput}`}
        aria-label={label}
        {...field}>
        {selectOptions}
      </select>
      {meta.touched && meta.error && (
        <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
          {meta.error}
        </div>
      )}
    </main>
  );
};
