import React from 'react';
import { TelephoneNumberInput } from '../input/basic-input/telephone-number-input/telephone-number-input.component';
import { AddressInput } from './../input/custom-input/address-input.component';
import styles from './section.css';

export const ContactInfoSection: React.FC = () => {
  return (
    <section className={styles.formSection}>
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Contact Info</h5>
      <section className={styles.formGroup}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Telephone Number</p>
        <TelephoneNumberInput label="" placeholder="Telephone number" name="telephoneNumber" />
      </section>
      <section className={styles.formGroup}>
        <AddressInput
          address1Name="address1"
          address2Name="address2"
          cityVillageName="cityVillage"
          stateProvinceName="stateProvince"
          countryName="country"
          postalCodeName="postalCode"
        />
      </section>
    </section>
  );
};
