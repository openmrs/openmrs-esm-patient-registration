import React, { useEffect } from 'react';
import { IdentifierInput } from '../input/custom-input/identifier-input.component';
import { PatientIdentifierType } from '../patient-registration-helper';
import styles from './section.css';

export const IdentifierSection: React.FC<{ identifierTypes: PatientIdentifierType[] }> = ({ identifierTypes }) => {
  return (
    <section className={styles.formSection}>
      <h5 className="omrs-type-title-5">Identifiers</h5>
      {identifierTypes.map(identifierType => (
        <IdentifierInput key={identifierType.fieldName} type={identifierType} />
      ))}
    </section>
  );
};
