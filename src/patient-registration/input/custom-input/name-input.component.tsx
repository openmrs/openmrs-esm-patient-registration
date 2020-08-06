import React from 'react';
import { TextInput } from '../basic-input/text-input.component';
import styles from './../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
}

export const NameInput: React.FC<NameInputProps> = ({ givenName, middleName, familyName }) => {
  return (
    <main className={styles.fieldRow}>
      <TextInput label="Given Name" placeholder="Given name" name={givenName} />
      <TextInput label="Middle Name" placeholder="Middle name" name={middleName} />
      <TextInput label="Family Name" placeholder="Family name" name={familyName} />
    </main>
  );
};
