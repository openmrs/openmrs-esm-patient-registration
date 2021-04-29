import React, { useState, useEffect } from 'react';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';
import styles from './patient-registration.scss';
import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import Button from 'carbon-components-react/es/components/Button';
import Link from 'carbon-components-react/es/components/Link';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Grid, Row, Column } from 'carbon-components-react/es/components/Grid';
import { validationSchema as initialSchema } from './validation/patient-registration-validation';
import { PatientIdentifierType, FormValues, CapturePhotoProps, PatientUuidMapType } from './patient-registration-types';
import { PatientRegistrationContext } from './patient-registration-context';
import FormManager, { SavePatientForm } from './form-manager';
import {
  fetchCurrentSession,
  fetchAddressTemplate,
  fetchPatientPhotoUrl,
  fetchPatientIdentifierTypesWithSources,
} from './patient-registration.resource';
import {
  createErrorHandler,
  showToast,
  useCurrentPatient,
  useConfig,
  navigate,
  interpolateString,
} from '@openmrs/esm-framework';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import { useTranslation } from 'react-i18next';
import { getSection } from './section/section-helper';
import { cancelRegistration, parseAddressTemplateXml, scrollIntoView } from './patient-registration-utils';

const initialAddressFieldValues = {};

const patientUuidMap: PatientUuidMapType = {
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

export interface PatientRegistrationProps {
  savePatientForm: SavePatientForm;
}

export const PatientRegistration: React.FC<PatientRegistrationProps> = ({ savePatientForm }) => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const config = useConfig();
  const [location, setLocation] = useState('');
  const [sections, setSections] = useState([]);
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  const [validationSchema, setValidationSchema] = useState(initialSchema);
  const [, existingPatient] = useCurrentPatient();
  const [capturePhotoProps, setCapturePhotoProps] = useState<CapturePhotoProps>(null);
  const [fieldConfigs, setFieldConfigs] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const inEditMode = !!existingPatient;

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

  useEffect(() => {
    const abortController = new AbortController();
    fetchCurrentSession(abortController).then(
      ({ data }) => setLocation(data.sessionLocation?.uuid),
      createErrorHandler(),
    );
    return () => abortController.abort();
  }, []);

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

  useEffect(() => {
    if (capturePhotoProps?.base64EncodedImage || capturePhotoProps?.imageFile) {
      setCurrentPhoto(capturePhotoProps.base64EncodedImage || URL.createObjectURL(capturePhotoProps.imageFile));
    }
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

    try {
      const patientUuid = await savePatientForm(
        values,
        patientUuidMap,
        initialAddressFieldValues,
        identifierTypes,
        capturePhotoProps,
        config?.concepts?.patientPhotoUuid,
        location,
        config?.personAttributeSections,
        abortController,
      );

      showToast({
        description: inEditMode ? t('updationSuccessToastDescription') : t('registrationSuccessToastDescription'),
        title: inEditMode ? t('updationSuccessToastTitle') : t('registrationSuccessToastTitle'),
        kind: 'success',
      });

      if (patientUuid) {
        const redirectUrl =
          new URLSearchParams(search).get('afterUrl') || interpolateString(config.links.submitButton, { patientUuid });
        navigate({ to: redirectUrl });
      }
    } catch (error) {
      if (error.responseBody && error.responseBody.error.globalErrors) {
        error.responseBody.error.globalErrors.forEach(error => {
          showToast({ description: error.message });
        });
      } else if (error.responseBody && error.responseBody.error.message) {
        showToast({ description: error.responseBody.error.message });
      } else {
        createErrorHandler()(error);
      }
    }
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
