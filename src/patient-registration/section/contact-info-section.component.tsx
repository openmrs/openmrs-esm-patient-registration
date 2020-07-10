import React from 'react';
import { AddressInput } from './../input/custom-input/address-input.component';
import styles from './section.css';
import { TextInput } from '../input/basic-input/text-input.component';

export const ContactInfoSection: React.FC = () => {
  return (
    <section className={styles.formSection}>
      <h2 className="omrs-type-title-2">Contact Info</h2>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Phone Number</h3>
        <TextInput label="" placeholder="Enter patient phone number" name="phoneNumber" />
      </section>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Address</h3>
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
