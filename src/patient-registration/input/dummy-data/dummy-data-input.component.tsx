import React from 'react';
import { FormValues } from './../../patient-registration.component';
import styles from './../input.css';

interface DummyDataInputProps {
  setValues(values: FormValues, shouldValidate?: boolean): void;
}

const dummyFormValues: FormValues = {
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
  relationships: [
    {
      uuid: 'fde64618-4d3a-49e6-b252-e6fbcfa5cc14',
      name: 'Kimberly Hill',
      type: '8d919b58-c2cc-11de-8d13-0010c6dffd0f-A',
    },
  ],
};

export const DummyDataInput: React.FC<DummyDataInputProps> = ({ setValues }) => {
  return (
    <main className={styles.field}>
      <button
        onClick={() => setValues(dummyFormValues)}
        className={`omrs-btn omrs-filled-neutral ${styles.dummyData}`}
        type="button">
        Input Dummy Data
      </button>
    </main>
  );
};
