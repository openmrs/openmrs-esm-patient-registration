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
        <NameInput givenName="givenName" middleName="middleName" familyName="familyName" showRequiredAsterisk={true} />
        <UnidentifiedPatientInput name="unidentifiedPatient" setName={setFieldValue} />

        {/* {values.addNameInLocalLanguage ? (
          <div>
            <h3 className="omrs-type-title-5">Name in local language</h3>
            <NameInput
              givenName="additionalGivenName"
              middleName="additionalMiddleName"
              familyName="additionalFamilyName"
            />
          </div>
        ) : null}
        <div className="inline-form-container">
          <CheckboxInput label="Add name in local language" name="addNameInLocalLanguage" />
        </div> */}
      </section>
      <section className={styles.fieldGroup}>
        <BasicSelect
          name="gender"
          options={['Male', 'Female', 'Other', 'Unknown']}
          label="Gender"
          showRequiredAsterisk={true}
        />
      </section>
      <section className={styles.fieldGroup}>
        <BasicInput type="date" label="Date of Birth" name="birthdate" showRequiredAsterisk={true} />
        <BasicInput type="checkbox" label="Estimated Birthdate" name="birthdateEstimated" />
      </section>
      {values.birthdateEstimated ? (
        <section className={styles.fieldGroup}>
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" setBirthdate={setFieldValue} />
        </section>
      ) : null}
    </section>
  );
};
