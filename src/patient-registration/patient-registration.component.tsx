import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchema as initialSchema } from './validation/patient-registration-validation';
import * as Yup from 'yup';
import { Patient, PatientIdentifierType } from './patient-registration-helper';
import {
  getCurrentUserLocation,
  savePatient,
  uuidTelephoneNumber,
  getPrimaryIdentifierType,
  getSecondaryIdentifierTypes,
  getAddressTemplate,
} from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { showToast } from '@openmrs/esm-styleguide';
import { IdentifierSection } from './section/identifier/identifier-section.component';
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
  const [location, setLocation] = useState('');
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  const [validationSchema, setValidationSchema] = useState(initialSchema);
  const [addressTemplate, setAddressTemplate] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    getCurrentUserLocation(abortController).then(
      ({ data }) => setLocation(data.sessionLocation.uuid),
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
    (async () => {
      const [primaryIdentifierType, secondaryIdentifierTypes] = await Promise.all([
        getPrimaryIdentifierType(abortController),
        getSecondaryIdentifierTypes(abortController),
      ]);
      let types = [];
      types = [primaryIdentifierType, ...secondaryIdentifierTypes].filter(Boolean);
      let identifiersValidationSchema: any = {};
      types.forEach(type => {
        initialFormValues[type.fieldName] = '';
        let fieldValidationProps = Yup.string();
        if (type.required) {
          fieldValidationProps = fieldValidationProps.required('Identifier cannot be blank');
        }
        if (type.format) {
          fieldValidationProps = fieldValidationProps.matches(new RegExp(type.format), 'Invalid identifier format');
        }
        identifiersValidationSchema[type.fieldName] = fieldValidationProps;
      });
      setValidationSchema(validationSchema.concat(Yup.object(identifiersValidationSchema)));
      setIdentifierTypes(types);
    })();
    return () => abortController.abort();
  }, [validationSchema]);

  useEffect(() => {
    const abortController = new AbortController();
    getAddressTemplate(abortController).then(({ data }) => {
      setAddressTemplate(data.results[0].value);
    });
  }, []);

  const onFormSubmit = (values: FormValues) => {
    const identifiers = identifierTypes.reduce(function(ids, id) {
      const idValue = values[id.fieldName];
      if (idValue) {
        ids.push({
          identifier: idValue,
          identifierType: id.uuid,
          location: location,
          preferred: idValue.isPrimary,
        });
      }
      return ids;
    }, []);
    const abortController = new AbortController();
    const patient: Patient = {
      identifiers: identifiers,
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
        if (response.responseBody && response.responseBody.error.globalErrors) {
          response.responseBody.error.globalErrors.forEach(error => {
            showToast({ description: error.message });
          });
        } else if (response.responseBody && response.responseBody.error.message) {
          showToast({ description: response.responseBody.error.message });
        } else {
          createErrorHandler()(response);
        }
      });
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
            <div className={styles.formTitle}>
              <h1 className={`omrs-type-title-1 ${styles.title}`}>New Patient</h1>
              {localStorage.getItem('openmrs:devtools') === 'true' && <DummyDataInput setValues={props.setValues} />}
            </div>
            <IdentifierSection identifierTypes={identifierTypes} />
            <DemographicsSection setFieldValue={props.setFieldValue} values={props.values} />
            <ContactInfoSection addressTemplate={addressTemplate} />
            <button className={`omrs-btn omrs-filled-action ${styles.submit}`} type="submit">
              Register Patient
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
