import React from 'react';
import { NameInput } from '../input/custom-input/name-input.component';
import { TelephoneNumberInput } from '../input/basic-input/telephone-number-input/telephone-number-input.component';
import { SelectInput } from '../input//basic-input/select-input.component';
import styles from './section.css';

export const ContactPersonSection: React.FC = () => {
  const relationshipOptions = [
    'Doctor',
    'Sibling',
    'Parent',
    'Aunt/Uncle',
    'Supervisor',
    'Patient',
    'Child',
    'Niece/Nephew',
    'Supervisee',
  ];
  return (
    <section aria-label="contactPersonSection" className={styles.formSection}>
      <h2 className="omrs-type-title-2">Contact Person Info</h2>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Name</h3>
        <NameInput
          givenName="contactPersonGivenName"
          middleName="contactPersonMiddleName"
          familyName="contactPersonFamilyName"
        />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Telephone Number</h3>
        <TelephoneNumberInput label="" placeholder="Enter telephone number" name="contactPersonTelephoneNumber" />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Relationship</h3>
        <SelectInput name="contactPersonRelationship" options={relationshipOptions} />
      </section>
    </section>
  );
};
