import React from 'react';
import { Input } from '../../input/basic-input/input/input.component';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import { PatientRegistrationContext } from '../../patient-registration-context';
import styles from './../section.scss';

export const DeathInfoSection: React.FC = () => {
  const { values } = React.useContext(PatientRegistrationContext);

  return (
    <section className={styles.formSection} aria-label="Death Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Death Info</h5>
      <section className={styles.fieldGroup}>
        <Input labelText="Is Dead" name="isDead" id="isDead" light />
        {values.isDead && (
          <>
            <Input labelText="Date of Death" name="deathDate" id="deathDate" light />
            <SelectInput options={['Unknown', 'Stroke']} label="Cause of Death" name="deathCause" />
          </>
        )}
      </section>
    </section>
  );
};
