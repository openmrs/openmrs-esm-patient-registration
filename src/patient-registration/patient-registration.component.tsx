import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validationSchema } from './validation/patient-registration-validation';
import { Formik, Form, FieldArray } from 'formik';
import {
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  savePatient,
  uuidIdentifier,
} from './patient-registration.resource';
import { Patient, AttributeValue } from './patient-registration-helper';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { DemographicsSection } from './section/demographics/demographics-section.component';
import { ContactInfoSection } from './section/contact-info/contact-info-section.component';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import styles from './patient-registration.css';

import { useConfig } from '@openmrs/esm-module-config';
import { PersonAttributeSection } from './widgets/section/person-attribute-section.component';
//To do
//add a type check here
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
  attributes: AttributeValue[];
}

export const initialFormValues: FormValues = {
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
  attributes: [{ attributeType: '', value: '' }],
};

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
    attributes: [
      /*  { attributeType: '', value: '' }  */
    ],
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
  const config = useConfig();
  const [personAttConfig, setPersonAttConfig] = useState([]);

  useEffect(() => {
    config.personAttributes.map((c, i) => {
      const atts = {
        title: c.title,
        subTitle: c.subTitle,
        label: c.label,
        uuid: c.uuid,
        name: c.name,
        placeholder: c.placeholder,
        id: c.id,
      };
      setPersonAttConfig(personatt => [...personatt, atts]);
    });
  }, []);
  const onFormSubmit = (values: FormValues) => {
    const abortController = new AbortController();
    const patient: Patient = {
      identifiers: [
        {
          identifier: identifier,
          identifierType: uuidIdentifier,
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
        attributes: values.attributes,
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

    savePatient(abortController, patient).then(
      response => response.status == 201 && history.push(`/patient/${response.data.uuid}/chart`),
      createErrorHandler(),
    );
  };

  return (
    <main className={`omrs-main-content ${styles.main}`}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema(initialFormValues)}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.form}>
            <div className={styles.formTitle}>
              <h1 className={`omrs-type-title-1 ${styles.title}`}>New Patient</h1>
              {localStorage.getItem('openmrs:devtools') === 'true' ? (
                <DummyDataInput setValues={props.setValues} />
              ) : null}
            </div>
            <DemographicsSection setFieldValue={props.setFieldValue} values={props.values} />
            <ContactInfoSection />

            <FieldArray name="attributes">
              {fieldArrayProps => {
                const { push, form } = fieldArrayProps;
                const { values } = form;
                const { attributes } = values;
                return personAttConfig.length ? (
                  <section className={styles.formSection}>
                    <h2 className="omrs-type-title-2">Additional Patient Information</h2>
                    {personAttConfig.map((p, i) => {
                      if (attributes.length < personAttConfig.length) {
                        attributes.push({ attributeType: p.uuid, value: '' });
                      }
                      return (
                        <PersonAttributeSection
                          id={personAttConfig[i].id}
                          key={personAttConfig[i].id}
                          title={personAttConfig[i].title}
                          subTitle={personAttConfig[i].subTitle}
                          label={personAttConfig[i].label}
                          placeholder={personAttConfig[i].placeholder}
                          name={`attributes[${i}].value`}
                        />
                      );
                    })}
                  </section>
                ) : null;
              }}
            </FieldArray>

            <button className={`omrs-btn omrs-filled-action ${styles.submit}`} type="submit">
              Register Patient
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
