import React from 'react';
import { TextInput } from '../basic-input/text-input.component';
import styles from './../input.css';

interface AddressInputProps {
  address1Name: string;
  address2Name: string;
  cityVillageName: string;
  stateProvinceName: string;
  countryName: string;
  postalCodeName: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  address1Name,
  address2Name,
  cityVillageName,
  stateProvinceName,
  countryName,
  postalCodeName,
}) => {
  return (
    <main>
      <section className={styles.fieldRow}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Adress 1</p>
        <TextInput label="Adress 1" placeholder="First line of address" name={address1Name} />
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Address 2</p>
        <TextInput label="Address 2" placeholder="Second line of address" name={address2Name} />
      </section>
      <section className={styles.fieldRow}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>City/Village</p>
        <TextInput label="City/Village" placeholder="City/Village" name={cityVillageName} />
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>State/Province</p>
        <TextInput label="State/Province" placeholder="State/province" name={stateProvinceName} />
      </section>
      <section className={styles.fieldRow}>
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Country</p>
        <TextInput label="Country" placeholder="Country" name={countryName} />
        <p className={`omrs-type-body-regular ${styles.formLabel}`}>Postal Code</p>
        <TextInput label="Postal Code" placeholder="Postal code" name={postalCodeName} />
      </section>
    </main>
  );
};
