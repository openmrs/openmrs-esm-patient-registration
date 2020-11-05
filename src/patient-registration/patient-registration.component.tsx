import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchema as initialSchema } from './validation/patient-registration-validation';
import { Patient, PatientIdentifierType, AttributeValue } from './patient-registration-helper';
import {
  getCurrentUserLocation,
  savePatient,
  getPrimaryIdentifierType,
  getSecondaryIdentifierTypes,
  getAddressTemplate,
  getIdentifierSources,
  getAutoGenerationOptions,
  generateIdentifier,
  deletePersonName,
} from './patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { showToast } from '@openmrs/esm-styleguide';
import { DemographicsSection } from './section/demographics/demographics-section.component';
import { ContactInfoSection } from './section/contact-info/contact-info-section.component';
import { DeathInfoSection } from './section/death-info/death-info-section.component';
import { DummyDataInput } from './input/dummy-data/dummy-data-input.component';
import { PersonAttributesSection } from './section/person-attributes/person-attributes-section.component';

import styles from './patient-registration.scss';
import { IdentifierSection } from './section/identifier/identifiers-section.component';
import * as Yup from 'yup';
import { useCurrentPatient } from '@openmrs/esm-api';
import { camelCase, capitalize, find } from 'lodash';
import { useConfig, interpolateString, navigate } from '@openmrs/esm-config';
import { useTranslation } from 'react-i18next';
import { XAxis16 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

export const initialAddressFieldValues = {};
const patientUuidMap = {};
const deletedNames = [];

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
  birthdate: string;
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
  isDead: boolean;
  deathDate: string;
  deathCause: string;
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
  isDead: false,
  deathDate: '',
  deathCause: '',
};

export const getDeathInfo = (values: FormValues) => {
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

export const PatientRegistration: React.FC = () => {
  const { search } = useLocation();
  const config = useConfig();
  const [location, setLocation] = useState('');
  const [identifierTypes, setIdentifierTypes] = useState(new Array<PatientIdentifierType>());
  const [validationSchema, setValidationSchema] = useState(initialSchema);
  const [addressTemplate, setAddressTemplate] = useState('');
  const [isLoadingPatient, existingPatient, patientUuid, patientErr] = useCurrentPatient();
  const { t } = useTranslation();

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
      if (existingPatient.name) {
        existingPatient.name.forEach((name, index) => {
          if (index === 0) {
            patientUuidMap['preferredNameUuid'] = name.id;
            initialFormValues.givenName = name.given[0];
            initialFormValues.middleName = name.given[1];
            initialFormValues.familyName = name.family;
            if (name.given[0] === 'UNKNOWN' && name.family === 'UNKNOWN') {
              initialFormValues.unidentifiedPatient = true;
            }
          }
          if (index === 1) {
            patientUuidMap['additionalNameUuid'] = name.id;
            initialFormValues.addNameInLocalLanguage = true;
            initialFormValues.additionalGivenName = name.given[0];
            initialFormValues.additionalMiddleName = name.given[1];
            initialFormValues.additionalFamilyName = name.family;
          }
        });
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
    }
  }, [existingPatient]);

  const getNames = (values: FormValues) => {
    const names = [
      {
        uuid: patientUuidMap['preferredNameUuid'],
        preferred: true,
        givenName: values.givenName,
        middleName: values.middleName,
        familyName: values.familyName,
      },
    ];
    if (values.addNameInLocalLanguage) {
      names.push({
        uuid: patientUuidMap['additionalNameUuid'],
        preferred: false,
        givenName: values.additionalGivenName,
        middleName: values.additionalMiddleName,
        familyName: values.additionalFamilyName,
      });
    } else if (patientUuidMap['additionalNameUuid']) {
      deletedNames.push({
        nameUuid: patientUuidMap['additionalNameUuid'],
        personUuid: patientUuidMap['patientUuid'],
      });
    }
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

  useEffect(() => {
    if (config && config.personAttributeSections) {
      let { personAttributeSections } = config;
      let allPersonAttributes = [];
      personAttributeSections.forEach(({ personAttributes }) => {
        allPersonAttributes = allPersonAttributes.concat(personAttributes);
      });
      let personAttributesValidationSchema = Yup.object(
        allPersonAttributes.reduce((final, current) => {
          const { name, label, validation } = current;
          const { required, matches } = validation;
          let validationObj = Yup.string().matches(matches, `Invalid ${t(label)}`);
          if (required) {
            validationObj = validationObj.required(`${t(label)} is required`);
          }
          final[name] = validationObj;
          return final;
        }, {}),
      );
      setValidationSchema(oldSchema => oldSchema.concat(personAttributesValidationSchema));
    }
  }, [config]);

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

  const onFormSubmit = async (values: FormValues) => {
    const abortController = new AbortController();
    let identifiers = [];
    for (const type of identifierTypes) {
      const idValue = values[type.fieldName];
      if (idValue) {
        identifiers.push({
          uuid: patientUuidMap[type.fieldName] ? patientUuidMap[type.fieldName].uuid : undefined,
          identifier: idValue,
          identifierType: type.uuid,
          location: location,
          preferred: type.isPrimary,
        });
      } else if (type.autoGenerationSource) {
        const response = await generateIdentifier(type.autoGenerationSource.uuid, abortController);
        identifiers.push({
          identifier: response.data.identifier,
          identifierType: type.uuid,
          location: location,
          preferred: type.isPrimary,
        });
      }
    }

    const addressFieldValues: Record<string, string> = {};
    Object.keys(initialAddressFieldValues).forEach(fieldName => {
      addressFieldValues[fieldName] = values[fieldName];
    });

    const attributes: Array<AttributeValue> = [];
    if (config && config.personAttributeSections) {
      let { personAttributeSections } = config;
      personAttributeSections.forEach(({ personAttributes }) => {
        personAttributes.forEach(attr => {
          attributes.push({
            attributeType: attr.uuid,
            value: values[attr.name],
          });
        });
      });
    }

    const person = {
      uuid: patientUuidMap['patientUuid'],
      names: getNames(values),
      gender: values.gender.charAt(0),
      birthdate: values.birthdate,
      birthdateEstimated: values.birthdateEstimated,
      attributes: attributes,
      addresses: [addressFieldValues],
      ...getDeathInfo(values),
    };

    const patient: Patient = {
      uuid: patientUuidMap['patientUuid'],
      identifiers: identifiers,
      person: { ...person },
    };

    // handle deleted names
    deletedNames.forEach(async name => {
      await deletePersonName(name.nameUuid, name.personUuid, abortController);
    });

    const getAfterUrl = patientUuid => {
      return (
        new URLSearchParams(search).get('afterUrl') ||
        interpolateString(config.links.submitButton, { patientUuid: patientUuid })
      );
    };

    // handle save patient
    savePatient(abortController, patient, patientUuidMap['patientUuid'])
      .then(response => {
        if (response.ok) {
          navigate({ to: getAfterUrl(response.data.uuid) });
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
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--col">
                  <h4>{existingPatient ? 'Edit' : 'Create New'} Patient</h4>
                  {localStorage.getItem('openmrs:devtools') === 'true' && !existingPatient && (
                    <DummyDataInput setValues={props.setValues} />
                  )}
                </div>
              </div>

              <div className="bx--row">
                <div className="bx--col-lg-2 bx--col-md-2">
                  <span>Jump to</span>
                  <div className={styles.space05}>
                    <XAxis16 /> Basic Info
                  </div>
                  <div className={styles.space05}>
                    <XAxis16 /> Contact Details
                  </div>
                  <div className={styles.space05}>
                    <XAxis16 /> Relationships
                  </div>
                </div>
                <div className="bx--col-lg-10 bx--col-md-6">
                  <DemographicsSection setFieldValue={props.setFieldValue} values={props.values} />
                  <ContactInfoSection addressTemplate={addressTemplate} />
                  <IdentifierSection
                    identifierTypes={identifierTypes}
                    validationSchema={validationSchema}
                    setValidationSchema={setValidationSchema}
                    inEditMode={Boolean(existingPatient)}
                    values={props.values}
                  />
                  <DeathInfoSection values={props.values} />
                  {config && config.personAttributeSections && (
                    <PersonAttributesSection attributeSections={config.personAttributeSections} />
                  )}
                  <Button type="submit">{existingPatient ? 'Save Patient' : 'Register Patient'}</Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};
