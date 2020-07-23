import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Patient } from './patient-registration-helper';
import { getCurrentUserLocation, getUniquePatientIdentifier, savePatient } from './patient-registration.resource';
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
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  contactPersonGivenName: string;
  contactPersonMiddleName: string;
  contactPersonFamilyName: string;
  contactPersonPhone: string;
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
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    contactPersonGivenName: '',
    contactPersonMiddleName: '',
    contactPersonFamilyName: '',
    contactPersonPhone: '',
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
        gender: values.gender,
        birthdate: values.birthdate,
        birthdateEstimated: values.birthdateEstimated,
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
      patient.person.contactPerson = {
        names: [
          {
            preferred: true,
            givenName: values.contactPersonGivenName,
            middleName: values.contactPersonMiddleName,
            familyName: values.contactPersonFamilyName,
          },
        ],
        phoneNumber: values.contactPersonPhone,
        relationship: values.contactPersonRelationship,
      };
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
        validationSchema={Yup.object({
          givenName: Yup.string().required('Given name is required'),
          familyName: Yup.string().required('Family name is required'),
          gender: Yup.string()
            .oneOf(['Male', 'Female', 'Other', 'Unspecified'], 'Gender is unspecified')
            .required('Gender is required'),
          birthdate: Yup.date()
            .required('Birthdate is required')
            .max(Date(), 'Birthdate cannot be in the future')
            .nullable(),
          yearsEstimated: Yup.number().min(0, 'Years cannot be less than 0'),
          monthsEstimated: Yup.number().min(0, 'Months cannot be less than 0'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.form}>
            <h1 className={`omrs-type-title-1 ${styles.title}`}>New Patient</h1>
            <DemographicsSection setFieldValue={props.setFieldValue} values={props.values} />
            <ContactInfoSection />
            <ContactPersonSection />
            <button className={`omrs-btn omrs-filled-action ${styles.submit}`} type="submit" name="registerButton">
              Register Patient
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
