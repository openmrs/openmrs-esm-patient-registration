import React from 'react';
import styles from './../input.css';
import { BasicInput } from '../basic-input/input/basic-input.component';
import { PatientIdentifierType } from '../../patient-registration-helper';

interface IndentifierInputProps {
  type: PatientIdentifierType;
}

export const IdentifierInput: React.FC<IndentifierInputProps> = ({ type }) => {
  return (
    <div className={styles.fieldRow}>
      <div className={styles.subFieldRow}>
        <BasicInput
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
