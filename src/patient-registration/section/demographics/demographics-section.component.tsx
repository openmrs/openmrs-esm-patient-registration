import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormValues } from '../../patient-registration.component';
import { NameInput } from '../../input/custom-input/name/name-input.component';
import { UnidentifiedPatientInput } from '../../input/custom-input/unidentified-patient/unidentified-patient-input.component';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import { EstimatedAgeInput } from '../../input/custom-input/estimated-age/estimated-age-input.component';
import { Input } from '../../input/basic-input/input/input.component';
import styles from './../section.scss';
import { useField } from 'formik';

interface DemographicsSectionProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  values: FormValues;
}

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({ setFieldValue, values }) => {
  const { t } = useTranslation();
  const [field, meta] = useField('addNameInLocalLanguage');

  useEffect(() => {
    if (!field.value && meta.touched) {
      setFieldValue('additionalGivenName', '');
      setFieldValue('additionalMiddleName', '');
      setFieldValue('additionalFamilyName', '');
    }
  }, [field.value, meta.touched]);
  return (
    <section className={styles.formSection} aria-label="Demographics Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>{t('demographics', 'Demographics')}</h5>
      <section className={styles.fieldGroup}>
        <NameInput givenName="givenName" middleName="middleName" familyName="familyName" showRequiredAsterisk={true} />
        <UnidentifiedPatientInput name="unidentifiedPatient" setName={setFieldValue} />
      </section>
      <section className={styles.fieldGroup}>
        <Input type="checkbox" label="Add name" name="addNameInLocalLanguage" />
      </section>
      <section className={styles.fieldGroup}>
        {values.addNameInLocalLanguage && (
          <NameInput
            givenName="additionalGivenName"
            middleName="additionalMiddleName"
            familyName="additionalFamilyName"
            showRequiredAsterisk={true}
            label="Additional name"
          />
        )}
      </section>
      <section className={styles.fieldGroup}>
        <SelectInput
          name="gender"
          options={['Male', 'Female', 'Other', 'Unknown']}
          label="Gender"
          showRequiredAsterisk={true}
        />
      </section>
      <section className={styles.fieldGroup}>
        <Input type="date" label="Date of Birth" name="birthdate" showRequiredAsterisk={true} />
        <Input type="checkbox" label="Estimated Birthdate" name="birthdateEstimated" />
      </section>
      {values.birthdateEstimated && (
        <section className={styles.fieldGroup}>
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" setBirthdate={setFieldValue} />
        </section>
      )}
    </section>
  );
};
