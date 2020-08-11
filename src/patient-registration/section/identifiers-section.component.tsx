import React, { useEffect } from 'react';
import { IdentifierInput } from '../input/custom-input/identifier-input.component';
import { PatientIdentifierType } from '../patient-registration-helper';
import styles from './section.css';

export const IdentifierSection: React.FC<{ identifierTypes: PatientIdentifierType[] }> = ({ identifierTypes }) => {
  return (
    <section className={styles.formGroup}>
      <h3 className="omrs-type-title-5">Identifiers</h3>
      {identifierTypes.map(identifierType => (
        <IdentifierInput name={identifierType.fieldName} label={identifierType.name} key={identifierType.fieldName} />
      ))}
    </section>
  );
};
