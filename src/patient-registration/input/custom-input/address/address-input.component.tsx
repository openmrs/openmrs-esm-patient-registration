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
        <BasicInput type="text" label="Address 1" name={address1Name} />
        <BasicInput type="text" label="Address 2" name={address2Name} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="City/Village" name={cityVillageName} />
        <BasicInput type="text" label="State/Province" name={stateProvinceName} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <BasicInput type="text" label="Country" name={countryName} />
        <BasicInput type="text" label="Postal Code" name={postalCodeName} />
      </section>
    </main>
  );
};
