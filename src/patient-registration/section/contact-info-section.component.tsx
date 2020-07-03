import React from 'react';
import { AddressInput } from './../input/custom-input/address-input.component';
import styles from './section.css';

export const ContactInfoSection: React.FunctionComponent = () => {
  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Contact Info</h2>
      <section className={styles.formGroup}>
        <h3 className={styles.formGroupTitle}>Address</h3>
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
