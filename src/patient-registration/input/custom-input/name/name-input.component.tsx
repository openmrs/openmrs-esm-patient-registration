import React from 'react';
import { BasicInput } from '../../basic-input/input/basic-input.component';
import styles from './../../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
  showRequiredAsterisk: Boolean;
}

export const NameInput: React.FC<NameInputProps> = ({ givenName, middleName, familyName, showRequiredAsterisk }) => {
  return (
    <main className={styles.fieldRow}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor="name">
        <span>Name</span>
        {showRequiredAsterisk && <span className={styles.requiredField}> *</span>}
      </label>
      <BasicInput type="text" label="Given Name" placeholder="Given name" name={givenName} hideLabel={true} />
      <BasicInput type="text" label="Middle Name" placeholder="Middle name" name={middleName} hideLabel={true} />
      <BasicInput type="text" label="Family Name" placeholder="Family name" name={familyName} hideLabel={true} />
    </main>
  );
};
