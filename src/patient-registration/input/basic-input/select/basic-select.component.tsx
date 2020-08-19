import React from 'react';
import { useField } from 'formik';
import styles from './../../input.css';

interface BasicSelectProps {
  name: string;
  options: Array<string>;
  label?: string;
  showRequiredAsterisk?: boolean;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({ name, options, label, showRequiredAsterisk }) => {
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
      {label && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={field.name}>
          <span>{label}</span>
          {showRequiredAsterisk && <span className={styles.requiredField}> *</span>}
        </label>
      )}
      <div>
        <select
          className={`omrs-dropdown omrs-type-body-regular ${meta.touched && meta.error && styles.errorInput} ${
            styles.input
            } ${styles.selectInput}`}
          aria-label={name}
          {...field}>
          {selectOptions}
        </select>
        {meta.touched && meta.error && (
          <div className={`omrs-type-body-small ${styles.errorMessage}`} aria-label={`${field.name}Error`}>
            {meta.error}
          </div>
        )}
      </div>
    </main>
  );
};
