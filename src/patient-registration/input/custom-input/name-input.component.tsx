import React from 'react';
import { TextInput } from '../basic-input/text-input.component';
import styles from './../input.css';

interface NameInputProps {
  givenName: string;
  middleName: string;
  familyName: string;
}

export const NameInput: React.FunctionComponent<NameInputProps> = ({ givenName, middleName, familyName }) => {
  return (
    <main className={styles.field}>
      <TextInput label="Given Name" placeholder="Enter given name" name={givenName} />
      <TextInput label="Middle Name" placeholder="Enter middle name" name={middleName} />
      <TextInput label="Family Name" placeholder="Enter family name" name={familyName} />
    </main>
  );
};
