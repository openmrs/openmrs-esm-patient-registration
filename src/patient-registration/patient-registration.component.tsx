import React, { useState, useEffect } from 'react';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';
import styles from './patient-registration.scss';
import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import find from 'lodash-es/find';
import Button from 'carbon-components-react/es/components/Button';
import Link from 'carbon-components-react/es/components/Link';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Grid, Row, Column } from 'carbon-components-react/es/components/Grid';
import { validationSchema as initialSchema } from './validation/patient-registration-validation';
import { PatientIdentifier, PatientIdentifierType, FormValues, CapturePhotoProps } from './patient-registration-types';
import { PatientRegistrationContext } from './patient-registration-context';
import FormManager from './form-manager';
import {
  fetchCurrentUserLocation,
  savePatient,
  fetchAddressTemplate,
  deletePersonName,
  saveRelationship,
  savePatientPhoto,
  fetchPatientPhotoUrl,
  fetchPatientIdentifierTypesWithSources,
} from './patient-registration.resource';
import { createErrorHandler, showToast, useCurrentPatient, useConfig, navigate } from '@openmrs/esm-framework';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import { useTranslation } from 'react-i18next';
import { getSection } from './section/section-helper';
import { cancelRegistration, parseAddressTemplateXml, scrollIntoView } from './patient-registration-utils';

const initialAddressFieldValues = {};

const patientUuidMap = {
  additionalNameUuid: undefined,
  patientUuid: undefined,
  preferredNameUuid: undefined,
};

const blankFormValues: FormValues = {
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
  isDead: false,
  deathDate: '',
  deathCause: '',
  relationships: [{ relatedPerson: '', relationship: '' }],
};

// If a patient is fetched, this will be updated with their information
const initialFormValues: FormValues = { ...blankFormValues };

export const PatientRegistration: React.FC = () => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const config = useConfig();
  const [location, setLocation] = useState('');
  const [sections, setSections] = useState([]);
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  const [validationSchema, setValidationSchema] = useState(initialSchema);
  const [, existingPatient] = useCurrentPatient(); // TODO: Edit mode.
  const [capturePhotoProps, setCapturePhotoProps] = useState<CapturePhotoProps>(null);
  const [fieldConfigs, setFieldConfigs] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const inEditMode = !!existingPatient;

  // Updates the displayed sections whenever the config entry changes.
  useEffect(() => {
    if (config?.sections) {
      const configuredSections = config.sections.map(section => ({
        id: section,
        name: t(config.sectionDefinitions[section].name),
        fields: config.sectionDefinitions[section].fields,
      }));

      setSections(configuredSections);
      setFieldConfigs(config.fieldConfigurations);
    }
  }, [t, config]);

  // On Load: Fetches the current location from the /session endpoint.
  useEffect(() => {
    const abortController = new AbortController();
    fetchCurrentUserLocation(abortController).then(
      ({ data }) => setLocation(data.sessionLocation.uuid),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

  // If in Add Mode: Populates the form with blank values.
  // If in Edit Mode: Populates the form with the existingPatient's data.
  useEffect(() => {
    if (!inEditMode) {
      Object.assign(initialFormValues, blankFormValues);
    } else {
      patientUuidMap['patientUuid'] = existingPatient.id;

      // set names
      if (existingPatient.name.length) {
        let name = existingPatient.name[0];
        patientUuidMap['preferredNameUuid'] = name.id;
        initialFormValues.givenName = name.given[0];
        initialFormValues.middleName = name.given[1];
        initialFormValues.familyName = name.family;
        if (name.given[0] === 'UNKNOWN' && name.family === 'UNKNOWN') {
          initialFormValues.unidentifiedPatient = true;
        }
        if (existingPatient.name.length > 1) {
          name = existingPatient.name[1];
          patientUuidMap['additionalNameUuid'] = name.id;
          initialFormValues.addNameInLocalLanguage = true;
          initialFormValues.additionalGivenName = name.given[0];
          initialFormValues.additionalMiddleName = name.given[1];
          initialFormValues.additionalFamilyName = name.family;
        }
      }

      initialFormValues.gender = capitalize(existingPatient.gender);
      initialFormValues.birthdate = existingPatient.birthDate;
      initialFormValues.telephoneNumber = existingPatient.telecom ? existingPatient.telecom[0].value : '';

      existingPatient.identifier.forEach(id => {
        const key = camelCase(id.system || id.type.text);
        patientUuidMap[key] = {
          uuid: id.id,
          value: id.value,
        };
        initialFormValues[key] = id.value;
      });

      if (existingPatient.address && existingPatient.address[0]) {
        const address = existingPatient.address[0];
        Object.keys(address).forEach(prop => {
          switch (prop) {
            case 'id':
              patientUuidMap['preferredAddressUuid'] = address[prop];
              break;
            case 'city':
              initialAddressFieldValues['cityVillage'] = address[prop];
              break;
            case 'state':
              initialAddressFieldValues['stateProvince'] = address[prop];
              break;
            case 'district':
              initialAddressFieldValues['countyDistrict'] = address[prop];
              break;
            case 'extension':
              address[prop].forEach(ext => {
                ext.extension.forEach(extension => {
                  initialAddressFieldValues[extension.url.split('#')[1]] = extension.valueString;
                });
              });
              break;
            default:
              if (prop === 'country' || prop === 'postalCode') {
                initialAddressFieldValues[prop] = address[prop];
              }
          }
        });
      }

      if (existingPatient.deceasedBoolean || existingPatient.deceasedDateTime) {
        initialFormValues.isDead = true;
        initialFormValues.deathDate = existingPatient.deceasedDateTime
          ? existingPatient.deceasedDateTime.split('T')[0]
          : '';
      }

      const abortController = new AbortController();
      fetchPatientPhotoUrl(existingPatient.id, config.concepts.patientPhotoUuid, abortController).then(value =>
        setCurrentPhoto(value),
      ); // TODO: Edit mode

      return () => abortController.abort();
    }
  }, [inEditMode]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchPatientIdentifierTypesWithSources(abortController).then(identifierTypes => {
      for (const identifierType of identifierTypes) {
        // update form initial values
        if (!initialFormValues[identifierType.fieldName]) {
          initialFormValues[identifierType.fieldName] = '';
        }

        initialFormValues['source-for-' + identifierType.fieldName] =
          identifierType.identifierSources.length > 0 ? identifierType.identifierSources[0].name : '';
      }

      setIdentifierTypes(identifierTypes);
    });

    return () => abortController.abort();
  }, []);

  // Sets the current photo whenever it changes.
  useEffect(() => {
    if (capturePhotoProps?.base64EncodedImage || capturePhotoProps?.imageFile) {
      setCurrentPhoto(capturePhotoProps.base64EncodedImage || URL.createObjectURL(capturePhotoProps.imageFile));
    }
    // TODO: Investigate whether capturePhotoProps requires network in some way.
  }, [capturePhotoProps]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchAddressTemplate(abortController).then(({ data }) => {
      const addressTemplateXml = data.results[0].value;
      if (!addressTemplateXml) {
        return;
      }

      const { addressFieldValues, addressValidationSchema } = parseAddressTemplateXml(addressTemplateXml);

      for (const { name, defaultValue } of addressFieldValues) {
        if (!initialAddressFieldValues[name]) {
          initialAddressFieldValues[name] = defaultValue;
        }
      }

      setValidationSchema(validationSchema => validationSchema.concat(addressValidationSchema));
      Object.assign(initialFormValues, initialAddressFieldValues);
    });

    return () => abortController.abort();
  }, []);

  const onFormSubmit = async (values: FormValues) => {
    const abortController = new AbortController();
    const relationships = values.relationships;

    // TODO: Add mode. Edit mode. FormManager.createIdentifier makes network request (`generateIdentifiers`).
    const identifiers: Array<PatientIdentifier> = await FormManager.createIdentifiers(
      values,
      patientUuidMap,
      identifierTypes,
      abortController,
      location,
    );

    // TODO: Add mode. Edit mode. Makes NW request.
    const patient = FormManager.createPatient(values, config, patientUuidMap, initialAddressFieldValues, identifiers);

    // handle deleted names
    FormManager.getDeletedNames(patientUuidMap).forEach(async name => {
      // TODO: Add mode. Edit mode. Makes NW request.
      await deletePersonName(name.nameUuid, name.personUuid, abortController);
    });

    // handle save patient
    // TODO: Add mode. Edit mode.
    savePatient(abortController, patient, patientUuidMap['patientUuid'])
      .then(response => {
        // TODO this entire block of code should be migrated somewhere...
        if (response.ok) {
          const requests = relationships.map(tmp => {
            const { relatedPerson, relationship } = tmp;
            const relationshipType = relationship.split('/')[0];
            const direction = relationship.split('/')[1];
            const abortController = new AbortController();
            const { data } = response;
            if (direction === 'aIsToB') {
              return saveRelationship(abortController, {
                personA: relatedPerson,
                personB: data.uuid,
                relationshipType,
              });
            } else {
              return saveRelationship(abortController, {
                personA: data.uuid,
                personB: relatedPerson,
                relationshipType,
              });
            }
          });

          if (capturePhotoProps && (capturePhotoProps.base64EncodedImage || capturePhotoProps.imageFile)) {
            requests.push(
              savePatientPhoto(
                response.data.uuid,
                capturePhotoProps.imageFile,
                null,
                abortController,
                capturePhotoProps.base64EncodedImage,
                '/ws/rest/v1/obs',
                capturePhotoProps.photoDateTime,
                config.concepts.patientPhotoUuid,
              ),
            );
          }

          const results = Promise.all(requests);
          results.then(response => {}).catch(err => {});

          navigate({ to: FormManager.getAfterUrl(response.data.uuid, search, config) });

          inEditMode
            ? showToast({
                description: t('updationSuccessToastDescription'),
                title: t('updationSuccessToastTitle'),
                kind: 'success',
              })
            : showToast({
                description: t('registrationSuccessToastDescription'),
                title: t('registrationSuccessToastTitle'),
                kind: 'success',
              });
        }
      })
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
    <main className="omrs-main-content" style={{ backgroundColor: 'white' }}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.form}>
            <Grid>
              <Row>
                <Column lg={2} md={2} sm={1}>
                  <div className={styles.fixedPosition}>
                    <h4>{inEditMode ? 'Edit' : 'Create New'} Patient</h4>
                    {localStorage.getItem('openmrs:devtools') === 'true' && !inEditMode && (
                      <DummyDataInput setValues={props.setValues} />
                    )}
                    <p className={styles.label01}>Jump to</p>
                    {sections.map(section => (
                      <div className={`${styles.space05} ${styles.TouchTarget}`} key={section.name}>
                        <Link className={styles.LinkName} onClick={() => scrollIntoView(section.id)}>
                          <XAxis16 /> {t(`${section.name}`)}
                        </Link>
                      </div>
                    ))}
                    <Button style={{ marginBottom: '1rem', width: '11.688rem', display: 'block' }} type="submit">
                      {inEditMode ? t('updatePatient') : t('registerPatient')}
                    </Button>
                    <Button style={{ width: '11.688rem' }} kind="tertiary" onClick={cancelRegistration}>
                      {t('cancel')}
                    </Button>
                  </div>
                </Column>
                <Column lg={10} md={6}>
                  <Grid>
                    <PatientRegistrationContext.Provider
                      value={{
                        identifierTypes,
                        validationSchema,
                        setValidationSchema,
                        fieldConfigs,
                        values: props.values,
                        inEditMode,
                        setFieldValue: props.setFieldValue,
                      }}>
                      {sections.map((section, index) => (
                        <div key={index}>{getSection(section, index, setCapturePhotoProps, currentPhoto)}</div>
                      ))}
                    </PatientRegistrationContext.Provider>
                  </Grid>
                </Column>
              </Row>
            </Grid>
          </Form>
        )}
      </Formik>
    </main>
  );
};

/**
 * @internal
 * Just exported for testing
 */
export { initialFormValues };
