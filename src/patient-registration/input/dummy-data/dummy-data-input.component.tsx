import React from 'react';
import { FormValues } from './../../patient-registration.component';
import styles from './../input.scss';

interface DummyDataInputProps {
  setValues(values: FormValues, shouldValidate?: boolean): void;
}

export const dummyFormValues: FormValues = {
  givenName: 'John',
  middleName: '',
  familyName: 'Smith',
  unidentifiedPatient: false,
  additionalGivenName: 'Joey',
  additionalMiddleName: '',
  additionalFamilyName: 'Smitty',
  addNameInLocalLanguage: true,
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
  isDead: false,
  deathDate: '',
  deathCause: '',
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
