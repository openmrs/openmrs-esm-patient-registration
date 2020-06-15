import React, { useEffect, useState } from 'react';
import { Patient } from './patient-registration-helper';
import { getCurrentUserLocation, getUniquePatientIdentifier, savePatient } from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { Name } from './field/name/name.component';
import { Gender } from './field/gender/gender.component';
import { Birthdate } from './field/birthdate/birthdate.component';
import { Address } from './field/address/address.component';
import styles from './patient-registration.css';

const IDENTIFIER_TYPE: string = '05a29f94-c0ed-11e2-94be-8c13b969e334';

interface PatientRegistrationProps {}

export function PatientRegistration(props: PatientRegistrationProps) {
  const [unknown, setUnknown] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<Patient['identifiers'][0]['identifier']>('');
  const [location, setLocation] = useState<Patient['identifiers'][0]['location']>('');
  const [name, setName] = useState<Patient['person']['names'][0]>({
    preferred: true,
    givenName: '',
    middleName: '',
    familyName: '',
  });
  const [additionalName, setAdditionalName] = useState<Patient['person']['names'][1]>({
    preferred: false,
    givenName: '',
    middleName: '',
    familyName: '',
  });
  const [gender, setGender] = useState<Patient['person']['gender']>('');
  const [birthdate, setBirthdate] = useState<Patient['person']['birthdate']>(null);
  const [birthdateEstimated, setBirthdateEstimated] = useState<Patient['person']['birthdateEstimated']>(false);
  const [birthtime, setBirthtime] = useState<Patient['person']['birthtime']>(null);
  const [address, setAddress] = useState<Patient['person']['addresses'][0]>({
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    latitude: '',
    longitude: '',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    getCurrentUserLocation(abortController).then(
      ({ data }) => setLocation(data.sessionLocation.uuid),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getUniquePatientIdentifier(abortController).then(
      ({ data }) => setIdentifier(data.identifiers[0]),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const abortController = new AbortController();
    const patient: Patient = {
      identifiers: [
        {
          identifier: identifier,
          identifierType: IDENTIFIER_TYPE,
          location: location,
        },
      ],
      person: {
        names: [name, additionalName],
        gender: gender,
        birthdate: birthdate,
        birthdateEstimated: birthdateEstimated,
        birthtime: birthtime,
        addresses: [address],
      },
    };

    savePatient(abortController, patient).then(
      response => response.status == 201 && props.history.push(`/patient/${response.data.uuid}/chart`),
      createErrorHandler(),
    );
  };

  return (
    <main className="omrs-main-content">
      <form onSubmit={onFormSubmit} className={styles.dashboard}>
        <h1 className={styles.title}>New Patient</h1>
        <section className={styles.formSection}>
          <h2 className={styles.subTitle}>Personal Details</h2>
          <hr className={styles.horizontalRule}></hr>
          <Name
            fieldName="Preferred Name"
            nameValue={name}
            unknownValue={unknown}
            onNameChange={setName}
            onUnknownChange={setUnknown}
          />
          <Name
            fieldName="Additional Name"
            nameValue={additionalName}
            unknownValue={unknown}
            onNameChange={setAdditionalName}
            onUnknownChange={setUnknown}
          />
          <Gender value={gender} onChange={setGender} />
          <Birthdate
            birthdateValue={birthdate}
            birthdateEstimatedValue={birthdateEstimated}
            birthtimeValue={birthtime}
            onBirthdateChange={setBirthdate}
            onBirthdateEstimatedChange={setBirthdateEstimated}
            onBirthtimeChange={setBirthtime}
          />
        </section>
        <section className={styles.formSection}>
          <h2 className={styles.subTitle}>Address Information</h2>
          <hr className={styles.horizontalRule}></hr>
          <Address value={address} onChange={setAddress} />
        </section>
        <button id="submit" type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </main>
  );
}
