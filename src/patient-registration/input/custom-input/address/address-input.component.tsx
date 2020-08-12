import React from 'react';
import { BasicInput } from '../../basic-input/input/basic-input.component';
import styles from './../../input.css';

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
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="Address 1" placeholder="First line of address" name={address1Name} showLabel={true} />
        <BasicInput type="text" label="Address 2" placeholder="Second line of address" name={address2Name} showLabel={true} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="City/Village" placeholder="City/Village" name={cityVillageName} showLabel={true} />
        <BasicInput type="text" label="State/Province" placeholder="State/province" name={stateProvinceName} showLabel={true} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="Country" placeholder="Country" name={countryName} showLabel={true} />
        <BasicInput type="text" label="Postal Code" placeholder="Postal code" name={postalCodeName} showLabel={true} />
      </section>
    </main>
  );
};
