import React, { useState, useEffect } from 'react';
import styles from './section.css';
import { RelationshipInput } from '../input/custom-input/relationship-input.component ';

interface RelationshipProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
}

export const RelationshipSection: React.FC<RelationshipProps> = ({ setFieldValue }) => {
  return (
    <section className={styles.formSection}>
      <h2 className="omrs-type-title-2">Relationships</h2>
      <section className={styles.formGroup}>
        <RelationshipInput setFieldValue={setFieldValue} />
      </section>
    </section>
  );
};
