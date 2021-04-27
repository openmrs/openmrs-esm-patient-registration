import * as Yup from 'yup';
import React, { useState, useEffect, useCallback } from 'react';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';
import styles from './patient-registration.scss';
import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import find from 'lodash-es/find';
import Button from 'carbon-components-react/es/components/Button';
import Link from 'carbon-components-react/es/components/Link';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Grid, Row, Column } from 'carbon-components-react/es/components/Grid';
import { validationSchema as initialSchema } from './validation/patient-registration-validation';
import { PatientIdentifier, PatientIdentifierType, FormValues } from './patient-registration-helper';
import { PatientRegistrationContext } from './patient-registration-context';
import BeforeSavePrompt from './before-save-prompt';
import FormManager from './form-manager';
import {
  getCurrentUserLocation,
  savePatient,
  getPrimaryIdentifierType,
  getSecondaryIdentifierTypes,
  getAddressTemplate,
  getIdentifierSources,
  getAutoGenerationOptions,
  deletePersonName,
  saveRelationship,
  savePatientPhoto,
  fetchPatientPhotoUrl,
} from './patient-registration.resource';
import { createErrorHandler, showToast, useCurrentPatient, useConfig, navigate } from '@openmrs/esm-framework';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import { useTranslation } from 'react-i18next';
import { getSection } from './section/section-helper';

export const initialAddressFieldValues = {};

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

/**
 * @internal
 * Just exported for testing
 */
export { initialFormValues };

const getUrlWithoutPrefix = url => url.split(window['getOpenmrsSpaBase']())?.[1];
const getDeathInfo = (values: FormValues) => {
  const patientIsDead = {
    dead: true,
    deathDate: values.deathDate,
    causeOfDeath: values.deathCause,
  };

  const patientIsNotDead = { dead: false };

  return values.isDead ? patientIsDead : patientIsNotDead;
};

interface AddressValidationSchemaType {
  name: string;
  label: string;
  regex: RegExp;
  regexFormat: string;
}

export interface CapturePhotoProps {
  base64EncodedImage: string;
  imageFile: File;
  photoDateTime: string;
}

export const PatientRegistration: React.FC = () => {
  const { search } = useLocation();
  const config = useConfig();
  const history = useHistory();
  const [open, setModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState(undefined);
  const [location, setLocation] = useState('');
  const [sections, setSections] = useState([]);
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  const [validationSchema, setValidationSchema] = useState(initialSchema);
  const [addressTemplate, setAddressTemplate] = useState('');
  const [isLoadingPatient, existingPatient, patientUuid, patientErr] = useCurrentPatient();
  const { t } = useTranslation();
  const [capturePhotoProps, setCapturePhotoProps] = useState<CapturePhotoProps>(null);
  const [fieldConfigs, setFieldConfigs] = useState({});

  const [currentPhoto, setCurrentPhoto] = useState(null);
  const cancelNavFn = useCallback((evt: CustomEvent) => {
    if (!open && !evt.detail.navigationIsCanceled) {
      evt.detail.cancelNavigation();
      setNewUrl(evt.detail.newUrl);
      setModalOpen(true);

      // once the listener is run, we want to remove it immediately in case an infinite loop occurs due
      // to constant redirects
      evt.target.removeEventListener('single-spa:before-routing-event', cancelNavFn);
    }
  }, [open]);
  const onRequestClose = useCallback(() => {
    setModalOpen(false);
    // add the route blocked when
    window.addEventListener('single-spa:before-routing-event', cancelNavFn);
  }, []);
  const onRequestSubmit = useCallback(() => {
    history.push(`/${getUrlWithoutPrefix(newUrl)}`);
  }, [newUrl]);

  useEffect(() => {
    if (config && config.sections) {
      const tmp_sections = config.sections.map(section => ({
        id: section,
        name: t(config.sectionDefinitions[section].name),
        fields: config.sectionDefinitions[section].fields,
      }));
      setSections(tmp_sections);
      setFieldConfigs(config.fieldConfigurations);
    }
  }, [config]);

  const scrollIntoView = viewId => {
    document.getElementById(viewId).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
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
    if (existingPatient) {
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
      (async () => {
        const abortController = new AbortController();
        const value = await fetchPatientPhotoUrl(existingPatient.id, config.concepts.patientPhotoUuid, abortController);
        setCurrentPhoto(value);
      })();
    } else {
      Object.assign(initialFormValues, blankFormValues);
    }
  }, [existingPatient]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const [primaryIdentifierType, secondaryIdentifierTypes] = await Promise.all([
        getPrimaryIdentifierType(abortController),
        getSecondaryIdentifierTypes(abortController),
      ]);
      let types = [];
      types = [primaryIdentifierType, ...secondaryIdentifierTypes].filter(Boolean);
      for (const type of types) {
        const [sources, options] = await Promise.all([
          getIdentifierSources(type.uuid, abortController),
          getAutoGenerationOptions(type.uuid, abortController),
        ]);
        type.identifierSources = sources.data.results.map(source => {
          const option = find(options.results, { source: { uuid: source.uuid } });
          source.autoGenerationOption = option;
          return source;
        });
        // update form initial values
        if (!initialFormValues[type.fieldName]) {
          initialFormValues[type.fieldName] = '';
        }
        initialFormValues['source-for-' + type.fieldName] =
          type.identifierSources.length > 0 ? type.identifierSources[0].name : '';
      }
      setIdentifierTypes(types);
    })();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getAddressTemplate(abortController).then(({ data }) => {
      setAddressTemplate(data.results[0].value);
    });
  }, []);

  useEffect(() => {
    if (capturePhotoProps?.base64EncodedImage || capturePhotoProps?.imageFile) {
      setCurrentPhoto(capturePhotoProps.base64EncodedImage || URL.createObjectURL(capturePhotoProps.imageFile));
    }
  }, [capturePhotoProps]);

  useEffect(() => {
    if (addressTemplate) {
      const templateXmlDoc = new DOMParser().parseFromString(addressTemplate, 'text/xml');
      let nameMappings = templateXmlDoc.querySelector('nameMappings').querySelectorAll('property');
      let validationSchemaObjs: AddressValidationSchemaType[] = Array.prototype.map.call(nameMappings, nameMapping => {
        let field = nameMapping.getAttribute('name');
        let label = nameMapping.getAttribute('value');
        let regex = getValueIfItExists(field, 'elementRegex', templateXmlDoc);
        let regexFormat = getValueIfItExists(field, 'elementRegexFormats', templateXmlDoc);

        return {
          name: field,
          label,
          regex: regex || '.*',
          regexFormat: regexFormat || '',
        };
      });
      let addressValidationSchemaTmp = Yup.object(
        validationSchemaObjs.reduce((final, current) => {
          final[current.name] = Yup.string().matches(current.regex, current.regexFormat);
          return final;
        }, {}),
      );

      Array.prototype.forEach.call(nameMappings, nameMapping => {
        let name = nameMapping.getAttribute('name');
        if (!initialAddressFieldValues[name]) {
          let defaultValue = getValueIfItExists(name, 'elementDefaults', templateXmlDoc);
          initialAddressFieldValues[name] = defaultValue ?? '';
        }
      });

      Object.assign(initialFormValues, initialAddressFieldValues);
      setValidationSchema(validationSchema => validationSchema.concat(addressValidationSchemaTmp));
    }
  }, [addressTemplate]);

  const getValueIfItExists = (field: string, selector: string, doc: XMLDocument) => {
    let element = doc.querySelector(selector);
    if (element) {
      let property = element.querySelector(`[name=${field}]`);
      if (property) {
        return property.getAttribute('value');
      } else {
        return null;
      }
    }
    return null;
  };

  const cancelRegistration = () => {
    navigate({ to: `${window.spaBase}/home` });
  };

  const onFormSubmit = async (values: FormValues) => {
    const abortController = new AbortController();
    const relationships = values.relationships;

    const identifiers: Array<PatientIdentifier> = await FormManager.createIdentifiers(
      values,
      patientUuidMap,
      identifierTypes,
      abortController,
      location,
    );

    const patient = FormManager.createPatient(values, config, patientUuidMap, initialAddressFieldValues, identifiers);

    // handle deleted names
    FormManager.getDeletedNames(patientUuidMap).forEach(async name => {
      await deletePersonName(name.nameUuid, name.personUuid, abortController);
    });

    // handle save patient
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

          window.removeEventListener('single-spa:before-routing-event', cancelNavFn);
          navigate({ to: FormManager.getAfterUrl(response.data.uuid, search, config) });

          existingPatient
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
            <BeforeSavePrompt
              {...{
                when: props.dirty,
                open,
                newUrl,
                cancelNavFn,
                onRequestClose,
                onRequestSubmit,
              }}
            />
            <Grid>
              <Row>
                <Column lg={2} md={2} sm={1}>
                  <div className={styles.fixedPosition}>
                    <h4>{existingPatient ? 'Edit' : 'Create New'} Patient</h4>
                    {localStorage.getItem('openmrs:devtools') === 'true' && !existingPatient && (
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
                      {existingPatient ? t('updatePatient') : t('registerPatient')}
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
                        inEditMode: !!existingPatient,
                        setFieldValue: props.setFieldValue,
                      }}>
                      {sections.map((section, index) => (
                        <div key={index}>{getSection(section, index, { setCapturePhotoProps, currentPhoto })}</div>
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
