import React, { useEffect } from 'react';
import { Patient } from './patient-registration-helper';
import { getCurrentUserLocation, getUniquePatientIdentifier, savePatient } from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { PersonalDetails, PersonalDetailsState } from './section/personal-details/personal-details.component';
import {
  AddressInformation,
  AddressInformationState,
} from './section/address-information/address-information.component';
import styles from './patient-registration.css';

const IDENTIFIER_TYPE: string = '05a29f94-c0ed-11e2-94be-8c13b969e334';

interface PatientRegistrationProps {}

export function PatientRegistration(props: PatientRegistrationProps) {
  let patient: Patient = {
    identifiers: [
      {
        identifier: '',
        identifierType: IDENTIFIER_TYPE,
        location: '',
      },
    ],
    person: {
      names: [
        {
          givenName: '',
          middleName: '',
          familyName: '',
        },
      ],
      gender: '',
      birthdate: null,
      birthdateEstimated: false,
      birthtime: null,
      addresses: [
        {
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
        },
      ],
    },
  };

  useEffect(() => {
    const abortController = new AbortController();
    getCurrentUserLocation(abortController).then(
      ({ data }) => (patient.identifiers[0].location = data.sessionLocation.uuid),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getUniquePatientIdentifier(abortController).then(
      ({ data }) => (patient.identifiers[0].identifier = data.identifiers[0]),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

  const handlePersonalDetailsChange = (personalDetails: PersonalDetailsState) => {
    patient.person.gender = personalDetails.gender;
    patient.person.birthdate = personalDetails.birthDate;
    patient.person.birthtime = personalDetails.birthTime;
    patient.person.birthdateEstimated = personalDetails.estimate;
    patient.person.names[0].givenName = personalDetails.givenName;
    patient.person.names[0].middleName = personalDetails.middleName;
    patient.person.names[0].familyName = personalDetails.familyName;
  };

  const handleAddressInformationChange = (addressInformation: AddressInformationState) => {
    patient.person.addresses[0].address1 = addressInformation.address1;
    patient.person.addresses[0].address2 = addressInformation.address2;
    patient.person.addresses[0].cityVillage = addressInformation.cityVillage;
    patient.person.addresses[0].stateProvince = addressInformation.stateProvince;
    patient.person.addresses[0].postalCode = addressInformation.postalCode;
    patient.person.addresses[0].latitude = addressInformation.latitude;
    patient.person.addresses[0].longitude = addressInformation.longitude;
    patient.person.addresses[0].startDate = addressInformation.startDate;
    patient.person.addresses[0].endDate = addressInformation.endDate;
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const abortController = new AbortController();

    savePatient(abortController, patient).then(
      response => response.status == 201 && navigate(response.data.uuid),
      createErrorHandler(),
    );
  };

  const navigate = (patientUuid: string) => {
    window.location.href = `/openmrs/spa/patient/${patientUuid}/chart`;
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.dashboard}>
      <h1 className={styles.title}>New Patient</h1>
      <section className={styles.personalDetails}>
        <h2 className={styles.subTitle}>Personal Details</h2>
        <hr className={styles.horizontalRule}></hr>
        <PersonalDetails onChange={handlePersonalDetailsChange} />
      </section>
      <section className={styles.addressInformation}>
        <h2 className={styles.subTitle}>Address Information</h2>
        <hr className={styles.horizontalRule}></hr>
        <AddressInformation onChange={handleAddressInformationChange} />
      </section>
      <button id="submit" type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}
