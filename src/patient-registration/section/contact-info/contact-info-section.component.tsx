import React from 'react';
import { TelephoneNumberInput } from '../../input/basic-input/telephone-number/telephone-number-input.component';
import { AddressInput } from '../../input/custom-input/address/address-input.component';
import styles from './../section.css';

export const ContactInfoSection: React.FC = () => {
  return (
    <section className={styles.formSection} aria-label="contact info section">
      <h2 className="omrs-type-title-2">Contact Info</h2>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">Telephone Number</h3>
        <TelephoneNumberInput label="" placeholder="Enter telephone number" name="telephoneNumber" />
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
