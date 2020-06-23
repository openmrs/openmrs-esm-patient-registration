import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Patient } from './patient-registration-helper';
import { getCurrentUserLocation, getUniquePatientIdentifier, savePatient } from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { Name, NameValue } from './field/name/name.component';
import { Gender } from './field/gender/gender.component';
import { Birthdate } from './field/birthdate/birthdate.component';
import { Address, AddressValue } from './field/address/address.component';
import styles from './patient-registration.css';

export function PatientRegistration() {
  const history = useHistory();

  const [unknown, setUnknown] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [name, setName] = useState<NameValue>({
    preferred: true,
    givenName: '',
    middleName: '',
    familyName: '',
  });
  const [additionalName, setAdditionalName] = useState<NameValue>({
    preferred: false,
    givenName: '',
    middleName: '',
    familyName: '',
  });
  const [gender, setGender] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date>(null);
  const [birthdateEstimated, setBirthdateEstimated] = useState<boolean>(false);
  const [birthtime, setBirthtime] = useState<Date>(null);
  const [address, setAddress] = useState<AddressValue>({
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
          identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
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
      response => response.status == 201 && history.push(`/patient/${response.data.uuid}/chart`),
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
            fieldName="Preferred Name*"
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
