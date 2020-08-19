import React from 'react';
import { BasicInput } from '../../input/basic-input/input/basic-input.component';
import { AddressInput } from '../../input/custom-input/address/address-input.component';
import styles from './../section.css';

export const ContactInfoSection: React.FC = () => {
  return (
    <section className={styles.formSection} aria-label="Contact Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Contact Info</h5>
      <section className={styles.fieldGroup}>
        <BasicInput
          type="tel"
          label="Telephone number"
          name="telephoneNumber"
          showLabel={true}
        />
      </section>
      <section className={styles.fieldGroup}>
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
