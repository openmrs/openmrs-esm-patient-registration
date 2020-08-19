import React from 'react';
import { BasicInput } from '../../basic-input/input/basic-input.component';
import styles from './../../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
  labelRequired: Boolean;
}

export const NameInput: React.FC<NameInputProps> = ({ givenName, middleName, familyName, labelRequired }) => {
  return (
    <main className={styles.fieldRow}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor="name">
        <span>Name</span>
        {labelRequired && <span className={styles.requiredField}> *</span>}
      </label>
      <BasicInput type="text" label="Given Name" placeholder="Given name" name={givenName} showLabel={false} />
      <BasicInput type="text" label="Middle Name" placeholder="Middle name" name={middleName} showLabel={false} />
      <BasicInput type="text" label="Family Name" placeholder="Family name" name={familyName} showLabel={false} />
    </main>
  );
};
