import React from 'react';
import { FormValues } from '../../patient-registration.component';
import { NameInput } from '../../input/custom-input/name/name-input.component';
import { UnidentifiedPatientInput } from '../../input/custom-input/unidentified-patient/unidentified-patient-input.component';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import { DateInput } from '../../input/basic-input/date/date-input.component';
import { EstimatedAgeInput } from '../../input/custom-input/estimated-age/estimated-age-input.component';
import { CheckboxInput } from '../../input/basic-input/checkbox/checkbox-input.component';
import styles from './../section.css';

interface DemographicsSectionProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  values: FormValues;
}

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({ setFieldValue, values }) => {
  return (
    <section className={styles.formSection} aria-label="demographics section">
      <h2 className="omrs-type-title-2">Demographics</h2>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Name</h3>
        <NameInput givenName="givenName" middleName="middleName" familyName="familyName" />
        <UnidentifiedPatientInput label="Unidentified Patient" name="unidentifiedPatient" setName={setFieldValue} />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Gender</h3>
        <SelectInput name="gender" options={['Male', 'Female', 'Other', 'Unknown']} />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Birthdate</h3>
        <DateInput name="birthdate" />
        {values.birthdateEstimated ? (
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" setBirthdate={setFieldValue} />
        ) : null}
        <CheckboxInput label="Estimated Birthdate" name="birthdateEstimated" />
      </section>
    </section>
  );
};
