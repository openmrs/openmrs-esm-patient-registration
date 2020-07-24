import React from 'react';
import { TextInput } from '../input//basic-input/text-input.component';
import { SelectInput } from '../input//basic-input/select-input.component';
import { NameInput } from '../input/custom-input/name-input.component';
import styles from './section.css';
import { TelephoneNumberInput } from '../input/basic-input/telephone-number-input/telephone-number-input.component';

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
        <TelephoneNumberInput label="" placeholder="Enter telephone number" name="contactPersonPhone" />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Relationship</h3>
        <SelectInput name="contactPersonRelationship" options={relationshipOptions} />
      </section>
    </section>
  );
};
