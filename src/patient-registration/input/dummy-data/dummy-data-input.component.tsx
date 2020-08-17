import React from 'react';
import { FormValues } from './../../patient-registration.component';
import styles from './../input.css';

interface DummyDataInputProps {
  setValues(values: FormValues, shouldValidate?: boolean): void;
}

export const dummyFormValues: FormValues = {
  givenName: 'John',
  middleName: '',
  familyName: 'Smith',
  unidentifiedPatient: false,
  gender: 'Male',
  birthdate: null,
  yearsEstimated: 1,
  monthsEstimated: 2,
  birthdateEstimated: true,
  telephoneNumber: '0800001066',
  address1: 'Bom Jesus Street',
  address2: '',
  cityVillage: 'Recife',
  stateProvince: 'Pernambuco',
  country: 'Brazil',
  postalCode: '50030-310',
  attributes: [
    { attributeType: '14d4f066-15f5-102d-96e4-000c29c2a5d7', value: '0785674744' },
    { attributeType: '8d8718c2-c2cc-11de-8d13-0010c6dffd0f', value: 'Kampala' },
  ],
};

export const DummyDataInput: React.FC<DummyDataInputProps> = ({ setValues }) => {
  return (
    <main>
      <button
        onClick={() => setValues(dummyFormValues)}
        className={`omrs-btn omrs-filled-neutral ${styles.dummyData}`}
        type="button"
        aria-label="Dummy Data Input">
        Input Dummy Data
      </button>
    </main>
  );
};
