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
        <BasicInput type="text" label="Address 1" name={address1Name} showLabel={true} />
        <BasicInput type="text" label="Address 2" name={address2Name} showLabel={true} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="City/Village" name={cityVillageName} showLabel={true} />
        <BasicInput type="text" label="State/Province" name={stateProvinceName} showLabel={true} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="Country" name={countryName} showLabel={true} />
        <BasicInput type="text" label="Postal Code" name={postalCodeName} showLabel={true} />
      </section>
    </main>
  );
};
