import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchema } from './validation/patient-registration-validation';
import * as Yup from 'yup';
import { Patient, PatientIdentifierType } from './patient-registration-helper';
import {
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  savePatient,
  uuidIdentifier,
  uuidTelephoneNumber,
  getPrimaryIdentifierType,
  getSecondaryIdentifierTypes,
} from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { showToast } from '@openmrs/esm-styleguide';
import { DemographicsSection } from './section/demographics/demographics-section.component';
import { ContactInfoSection } from './section/contact-info/contact-info-section.component';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import styles from './patient-registration.css';

export interface FormValues {
  givenName: string;
  middleName: string;
  familyName: string;
  unidentifiedPatient: boolean;
  additionalGivenName: string;
  additionalMiddleName: string;
  additionalFamilyName: string;
  addNameInLocalLanguage: boolean;
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
}

export const initialFormValues: FormValues = {
  givenName: '',
  middleName: '',
  familyName: '',
  unidentifiedPatient: false,
  additionalGivenName: '',
  additionalMiddleName: '',
  additionalFamilyName: '',
  addNameInLocalLanguage: false,
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
};

export const PatientRegistration: React.FC = () => {
  const history = useHistory();
  const [identifier, setIdentifier] = useState('');
  const [location, setLocation] = useState('');
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  
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

  const getNames = (values: FormValues) => {
    const names = [
      {
        preferred: true,
        givenName: values.givenName,
        middleName: values.middleName,
        familyName: values.familyName,
      },
    ];

    values.addNameInLocalLanguage &&
      names.push({
        preferred: false,
        givenName: values.additionalGivenName,
        middleName: values.additionalMiddleName,
        familyName: values.additionalFamilyName,
      });

    return names;
  };
  
  useEffect(() => {
    const abortController = new AbortController();
    getPrimaryIdentifierType(abortController).then(primaryIdentifierType => {
      getSecondaryIdentifierTypes(abortController).then(secondaryIdentifierTypes => {
        let idTypes = [];
        idTypes = [primaryIdentifierType, ...secondaryIdentifierTypes].filter(Boolean);
        idTypes.forEach(type => {
          // update form initial values and validation schema
          initialFormValues[type.fieldName] = '';
          let fieldValidationProps = Yup.string();
          if (type.required) {
            fieldValidationProps = fieldValidationProps.required("Identifier can't be blank!");
          }
          if (type.format) {
            fieldValidationProps = fieldValidationProps.matches(new RegExp(type.format), 'Invalid identifier format!');
          }
          validationSchema[type.fieldName] = fieldValidationProps;
        });
        setIdentifierTypes(idTypes);
      }, createErrorHandler());
    }, createErrorHandler());
    return () => abortController.abort();
  }, []);

  const onFormSubmit = (values: FormValues) => {
    const patIdentifiers = identifierTypes.reduce(function(ids, id) {
      const idValue = values[id.fieldName];
      if (idValue) {
        ids.push({
          identifier: idValue,
          identifierType: id.uuid,
          location: location,
        });
      }
      return ids;
    }, []);
    const abortController = new AbortController();
    const patient: Patient = {
      identifiers: patIdentifiers,
      person: {
        names: getNames(values),
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
    savePatient(abortController, patient)
      .then(response => response.status == 201 && history.push(`/patient/${response.data.uuid}/chart`))
      .catch(response => {
        if (response.responseBody.error.globalErrors) {
          response.responseBody.error.globalErrors.forEach(error => {
            showToast({ description: error.message });
          });
        } else {
          createErrorHandler();
        }
      });
  };

  return (
    <main className={`omrs-main-content ${styles.main}`}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.form}>
            <div className={styles.formTitle}>
              <h1 className={`omrs-type-title-1 ${styles.title}`}>New Patient</h1>
              {localStorage.getItem('openmrs:devtools') === 'true' && <DummyDataInput setValues={props.setValues} />}
            </div>
            <DemographicsSection
              setFieldValue={props.setFieldValue}
              values={props.values}
              identifierTypes={identifierTypes}
            />
            <ContactInfoSection />
            <button className={`omrs-btn omrs-filled-action ${styles.submit}`} type="submit">
              Register Patient
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
