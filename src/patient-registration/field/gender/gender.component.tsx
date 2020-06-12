import React from 'react';
import styles from './../field.css';

interface GenderProps {
  value: string;
  onChange(gender: string): void;
}

export function Gender(props: GenderProps) {
  return (
    <main className={styles.row}>
      <h1 className={styles.fieldHeader}>Gender</h1>
      <select
        name="gender"
        aria-label="genderSelect"
        className={styles.fieldInput}
        value={props.value}
        onChange={event => props.onChange(event.target.value)}>
        <option value="" disabled>
          Select
        </option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
        <option value="U">Unknown</option>
      </select>
    </main>
  );
}
