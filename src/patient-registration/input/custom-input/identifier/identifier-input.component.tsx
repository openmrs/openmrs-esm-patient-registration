import React from 'react';
import { PatientIdentifierType } from '../../../patient-registration-helper';
import { Input } from '../../basic-input/input/input.component';
import styles from './../../input.css';

interface IndentifierInputProps {
  type: PatientIdentifierType;
}

export const IdentifierInput: React.FC<IndentifierInputProps> = ({ type }) => {
  return (
    <div className={styles.fieldRow}>
      <div className={styles.subFieldRow}>
        <Input
          type="text"
          label={type.name}
          placeholder="Enter identifier"
          name={type.fieldName}
          showRequiredAsterisk={type.required}
        />
      </div>
    </div>
  );
};
