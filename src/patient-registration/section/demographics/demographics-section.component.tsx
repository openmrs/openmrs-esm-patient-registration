import React from 'react';
import { FormValues } from '../../patient-registration.component';
import { NameInput } from '../../input/custom-input/name/name-input.component';
import { UnidentifiedPatientInput } from '../../input/custom-input/unidentified-patient/unidentified-patient-input.component';
import { BasicSelect } from '../../input/basic-input/select/basic-select.component';
import { EstimatedAgeInput } from '../../input/custom-input/estimated-age/estimated-age-input.component';
import { BasicInput } from '../../input/basic-input/input/basic-input.component';
import styles from './../section.css';

interface DemographicsSectionProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  values: FormValues;
}

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({ setFieldValue, values }) => {
  return (
    <section className={styles.formSection} aria-label="Demographics Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Demographics</h5>
      <section className={styles.fieldGroup}>
        <NameInput givenName="givenName" middleName="middleName" familyName="familyName" />
        <UnidentifiedPatientInput name="unidentifiedPatient" setName={setFieldValue} />
      </section>
      <section className={styles.fieldGroup}>
        <BasicSelect name="gender" options={['Male', 'Female', 'Other', 'Unknown']} label="Gender" showLabel={true} />
      </section>
      <section className={styles.fieldGroup}>
        <BasicInput type="date" label="Date of Birth" name="birthdate" showLabel={true} />
        <BasicInput type="checkbox" label="Estimated Birthdate" name="birthdateEstimated" showLabel={true} />
      </section>
      {values.birthdateEstimated ? (
        <section className={styles.fieldGroup}>
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" setBirthdate={setFieldValue} />
        </section>
      ) : null}
    </section>
  );
};
