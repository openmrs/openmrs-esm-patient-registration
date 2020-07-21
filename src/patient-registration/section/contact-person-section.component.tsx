import React from 'react';
import { TextInput } from '../input//basic-input/text-input.component';
import { NameInput } from '../input/custom-input/name-input.component';
import styles from './section.css';

export const ContactPersonSection: React.FC = () => {
  return (
    <section aria-label="contactPersonSection" className={styles.formSection}>
      <h3 className="omrs-type-title-5">Name</h3>
      <NameInput
        givenName="contactPersonGivenName"
        middleName="contactPersonMiddleName"
        familyName="contactPersonFamilyName"
      />
      <TextInput label="Phone" placeholder="Enter phone" name="contactPersonPhone" />
    </section>
  );
};
