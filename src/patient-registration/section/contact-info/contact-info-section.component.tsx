import React from 'react';
import { Input } from '../../input/basic-input/input/input.component';
import { AddressInput } from '../../input/custom-input/address/address-input.component';
import styles from './../section.css';

interface ContactInfoSectionProps {
  addressTemplate?: string;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ addressTemplate }) => {
  return (
    <section className={styles.formSection} aria-label="Contact Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Contact Info</h5>
      <section className={styles.fieldGroup}>
        <Input type="tel" label="Telephone number" name="telephoneNumber" />
      </section>
      <section className={styles.fieldGroup}>
        <AddressInput
          address1Name="address1"
          address2Name="address2"
          cityVillageName="cityVillage"
          stateProvinceName="stateProvince"
          countryName="country"
          postalCodeName="postalCode"
          addressTemplate={addressTemplate}
        />
      </section>
    </section>
  );
};
