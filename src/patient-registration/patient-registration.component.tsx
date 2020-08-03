import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchema } from './patient-registration-validation';
import { Patient } from './patient-registration-helper';
import {
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  savePatient,
  uuidTelephoneNumber,
  uuidContactPerson,
} from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { DemographicsSection } from './section/demographics-section.component';
import { ContactInfoSection } from './section/contact-info-section.component';
import { ContactPersonSection } from './section/contact-person-section.component';
import styles from './patient-registration.css';

export interface FormValues {
  givenName: string;
  middleName: string;
  familyName: string;
  unidentifiedPatient: boolean;
  gender: string;
  birthdate: Date;
  yearsEstimated: number;
  monthsEstimated: number;
  birthdateEstimated: boolean;
  telephoneNumber: string;
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  contactPersonGivenName: string;
  contactPersonMiddleName: string;
  contactPersonFamilyName: string;
  contactPersonTelephoneNumber: string;
  contactPersonRelationship: string;
}

export const PatientRegistration: React.FC = () => {
  const history = useHistory();
  const [identifier, setIdentifier] = useState('');
  const [location, setLocation] = useState('');
  const initialFormValues: FormValues = {
    givenName: '',
    middleName: '',
    familyName: '',
    unidentifiedPatient: false,
    gender: '',
    birthdate: null,
    yearsEstimated: 0,
    monthsEstimated: 0,
    birthdateEstimated: false,
    telephoneNumber: '',
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    contactPersonGivenName: '',
    contactPersonMiddleName: '',
    contactPersonFamilyName: '',
    contactPersonTelephoneNumber: '',
    contactPersonRelationship: '',
  };

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

  const onFormSubmit = (values: FormValues) => {
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
        names: [
          {
            preferred: true,
            givenName: values.givenName,
            middleName: values.middleName,
            familyName: values.familyName,
          },
        ],
        gender: values.gender.charAt(0),
        birthdate: values.birthdate,
        birthdateEstimated: values.birthdateEstimated,
        attributes: [
          {
            attributeType: uuidTelephoneNumber,
            value: values.telephoneNumber,
          },
        ],
        addresses: [
          {
            address1: values.address1,
            address2: values.address2,
            cityVillage: values.cityVillage,
            stateProvince: values.stateProvince,
            postalCode: values.postalCode,
            country: values.country,
          },
        ],
      },
    };

    if (values.contactPersonGivenName) {
      const contactPersonAttributes = [
        {
          attributeType: uuidContactPerson.givenName,
          value: values.contactPersonGivenName,
        },
        {
          attributeType: uuidContactPerson.middleName,
          value: values.contactPersonMiddleName,
        },
        {
          attributeType: uuidContactPerson.familyName,
          value: values.contactPersonFamilyName,
        },
        {
          attributeType: uuidContactPerson.telephoneNumber,
          value: values.contactPersonTelephoneNumber,
        },
        {
          attributeType: uuidContactPerson.relationship,
          value: values.contactPersonRelationship,
        },
      ];
      patient.person.attributes = patient.person.attributes.concat(contactPersonAttributes);
    }

    savePatient(abortController, patient).then(
      response => response.status == 201 && history.push(`/patient/${response.data.uuid}/chart`),
      createErrorHandler(),
    );
  };

  return (
    <main className={`omrs-main-content ${styles.main}`}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.form}>
            <h1 className={`omrs-type-title-1 ${styles.title}`}>New Patient</h1>
            <DemographicsSection setFieldValue={props.setFieldValue} values={props.values} />
            <ContactInfoSection />
            {localStorage.getItem('patient-registration:contact-person') === 'true' && <ContactPersonSection />}
            <button className={`omrs-btn omrs-filled-action ${styles.submit}`} type="submit">
              Register Patient
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
