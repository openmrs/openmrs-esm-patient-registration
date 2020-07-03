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

export const AddressInput: React.FunctionComponent<AddressInputProps> = ({
  address1Name,
  address2Name,
  cityVillageName,
  stateProvinceName,
  countryName,
  postalCodeName,
}) => {
  return (
    <main className={styles.field}>
      <TextInput label="Address 1" placeholder="Enter first line of address" name={address1Name} />
      <TextInput label="Address 2" placeholder="Enter second line of address" name={address2Name} />
      <TextInput label="City/Village" placeholder="Enter city/address" name={cityVillageName} />
      <TextInput label="State/Province" placeholder="Enter state/province" name={stateProvinceName} />
      <TextInput label="Country" placeholder="Enter country" name={countryName} />
      <TextInput label="Postal Code" placeholder="Enter postal code" name={postalCodeName} />
    </main>
  );
};
