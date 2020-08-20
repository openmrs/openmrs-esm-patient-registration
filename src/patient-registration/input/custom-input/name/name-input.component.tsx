import React from 'react';
import { BasicInput } from '../../basic-input/input/basic-input.component';
import styles from './../../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
  showRequiredAsterisk: Boolean;
  label?: string;
}

export const NameInput: React.FC<NameInputProps> = ({
  givenName,
  middleName,
  familyName,
  showRequiredAsterisk,
  label = 'Name',
}) => {
  return (
    <main className={styles.fieldRow}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor="name">
        <span>{label}</span>
        {showRequiredAsterisk && <span className={styles.requiredField}> *</span>}
      </label>
      <BasicInput type="text" placeholder="Given name" name={givenName} />
      <BasicInput type="text" placeholder="Middle name" name={middleName} />
      <BasicInput type="text" placeholder="Family name" name={familyName} />
    </main>
  );
};
