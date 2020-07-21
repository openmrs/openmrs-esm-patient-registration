import React from 'react';
import { TextInput } from '../input//basic-input/text-input.component';
import { SelectInput } from '../input//basic-input/select-input.component';
import { NameInput } from '../input/custom-input/name-input.component';
import styles from './section.css';

export const ContactPersonSection: React.FC = () => {
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
        <h3 className="omrs-type-title-5">Phone</h3>
        <TextInput label="" placeholder="Enter phone" name="contactPersonPhone" />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Relationship</h3>
        <SelectInput name="contactPersonRelationship" options={[]} />
      </section>
    </section>
  );
};
