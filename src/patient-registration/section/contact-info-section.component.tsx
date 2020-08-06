import React from 'react';
import { TelephoneNumberInput } from '../input/basic-input/telephone-number-input/telephone-number-input.component';
import { AddressInput } from './../input/custom-input/address-input.component';
import styles from './section.css';

export const ContactInfoSection: React.FC = () => {
  return (
    <section className={styles.formSection}>
      <h2 className="omrs-type-title-5">Contact Info</h2>
      <section className={styles.formGroup}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Telephone Number</p>
        <TelephoneNumberInput label="" placeholder="Telephone number" name="telephoneNumber" />
      </section>
      <section className={styles.formGroup}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Adress</p>
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
