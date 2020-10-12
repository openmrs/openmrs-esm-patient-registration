import React from 'react';
import { AddressInput } from '../../input/custom-input/address/address-input.component';
import styles from './../section.css';
import { Autocomplete } from '../../input/autocomplete/autocomplete.component';
import { getAddressHierarchy } from '../../patient-registration.resource';
import { useTranslation } from 'react-i18next';

interface ContactInfoSectionProps {
  addressTemplate?: string;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ addressTemplate }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.formSection} aria-label="Contact Info Section">
      <h5 className={`omrs-type-title-5 ${styles.formSectionTitle}`}>Contact Info</h5>
      <br />
      <Autocomplete
        name="addressHierarchySearch"
        label="Search Address"
        placeholder={t('addressSearchPlaceHolder', 'Type a City, State or Country')}
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
