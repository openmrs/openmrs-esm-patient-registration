import React from 'react';
import { BasicInput } from '../../basic-input/basic-input.component';
import styles from './../../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
}

export const NameInput: React.FC<NameInputProps> = ({ givenName, middleName, familyName }) => {
  return (
    <main className={styles.fieldRow}>
      <label className={`omrs-type-body-regular ${styles.label}`} htmlFor="name">
        Name
      </label>
      <BasicInput type="text" label="Given Name" placeholder="Given name" name={givenName} showLabel={false} />
      <BasicInput type="text" label="Middle Name" placeholder="Middle name" name={middleName} showLabel={false} />
      <BasicInput type="text" label="Family Name" placeholder="Family name" name={familyName} showLabel={false} />
    </main>
  );
};
