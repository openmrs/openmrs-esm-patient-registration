import React from 'react';
import { Input } from '../../basic-input/input/input.component';
import styles from './../../input.scss';

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
      <Input type="text" placeholder="Given name" name={givenName} />
      <Input type="text" placeholder="Middle name" name={middleName} />
      <Input type="text" placeholder="Family name" name={familyName} />
    </main>
  );
};
