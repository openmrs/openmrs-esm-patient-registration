import React from 'react';
import { AddressInput } from '../../input/custom-input/address/address-input.component';
import styles from './../section.css';
import { Autocomplete } from '../../input/autocomplete/autocomplete.component';
import { getAddressHierarchy } from '../../patient-registration.resource';

interface ContactInfoSectionProps {
  addressTemplate?: string;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ addressTemplate }) => {
  return (
    <section className={styles.formSection} aria-label="Contact Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Contact Info</h5>
      <br />
      <Autocomplete
        name="addressHierarchySearch"
        label="Search Address"
        placeholder="Type a city, postal code, state or country to search for an address"
        noResultsMessage="no address found, please enter the address manually"
        getSearchResults={getAddressHierarchy}
      />
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
