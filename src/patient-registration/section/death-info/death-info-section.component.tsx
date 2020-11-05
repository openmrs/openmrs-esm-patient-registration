import React from 'react';
import { Input } from '../../input/basic-input/input/input.component';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import styles from './../section.scss';
import { FormValues } from '../../patient-registration.component';

interface DeathInfoSectionProps {
  values: FormValues;
}

export const DeathInfoSection: React.FC<DeathInfoSectionProps> = ({ values }) => {
  return (
    <section className={styles.formSection} aria-label="Death Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Death Info</h5>
      <section className={styles.fieldGroup}>
        <Input type="checkbox" label="Is Dead" name="isDead" />
        {values.isDead && (
          <>
            <Input type="date" label="Date of Death" name="deathDate" />
            <SelectInput options={['Unknown', 'Stroke']} label="Cause of Death" name="deathCause" />
          </>
        )}
      </section>
    </section>
  );
};
