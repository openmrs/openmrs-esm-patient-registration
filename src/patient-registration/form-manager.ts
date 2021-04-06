import {
  PatientIdentifier,
  FormValues,
  PatientIdentifierType,
  AttributeValue,
  PatientUuidMapType,
  Patient,
} from './patient-registration-helper';
import { generateIdentifier } from './patient-registration.resource';
import { ConfigObject, interpolateString } from '@openmrs/esm-framework';

export default class FormManager {
  static createIdentifiers(
    values: FormValues,
    patientUuidMap: object,
    identifierTypes: Array<PatientIdentifierType>,
    abortController: AbortController,
    location: string,
  ) {
    const identifiers: Array<Promise<PatientIdentifier>> = identifierTypes.map(type => {
      const idValue = values[type.fieldName];
      if (idValue) {
        return Promise.resolve({
          uuid: patientUuidMap[type.fieldName] ? patientUuidMap[type.fieldName].uuid : undefined,
          identifier: idValue,
          identifierType: type.uuid,
          location: location,
          preferred: type.isPrimary,
        });
      } else if (type.autoGenerationSource) {
        return new Promise((resolve, _) => {
          generateIdentifier(type.autoGenerationSource.uuid, abortController).then(response => {
            resolve({
              // is this undefined?
              uuid: undefined,
              identifier: response.data.identifier,
              identifierType: type.uuid,
              location: location,
              preferred: type.isPrimary,
            });
          });
        });
      }
    });

    return Promise.all(identifiers);
  }

  static populateAddressValues(
    values: FormValues,
    initialAddressFieldValues: Record<string, any>,
  ): Record<string, string> {
    return Object.keys(initialAddressFieldValues).reduce(
      (memo, fieldName) => ({ ...memo, [fieldName]: values[fieldName] }),
      {},
    );
  }

  static getDeletedNames(patientUuidMap: PatientUuidMapType) {
    if (patientUuidMap?.additionalNameUuid) {
      return [
        {
          nameUuid: patientUuidMap.additionalNameUuid,
          personUuid: patientUuidMap.patientUuid,
        },
      ];
    }
    return [];
  }

  static getNames(values: FormValues, patientUuidMap: PatientUuidMapType) {
    const names = [
      {
        uuid: patientUuidMap.preferredNameUuid,
        preferred: true,
        givenName: values.givenName,
        middleName: values.middleName,
        familyName: values.familyName,
      },
    ];
    if (values.addNameInLocalLanguage) {
      names.push({
        uuid: patientUuidMap.additionalNameUuid,
        preferred: false,
        givenName: values.additionalGivenName,
        middleName: values.additionalMiddleName,
        familyName: values.additionalFamilyName,
      });
    }

    return names;
  }

  static getAfterUrl(patientUuid: string, search: string, config: ConfigObject) {
    return (
      new URLSearchParams(search).get('afterUrl') ||
      interpolateString(config.links.submitButton, { patientUuid: patientUuid })
    );
  }

  static getDeathInfo(values: FormValues) {
    const { isDead, deathDate, deathCause } = values;
    const result = {
      dead: isDead,
      deathDate: isDead ? deathDate : undefined,
      causeOfDeath: isDead ? deathCause : undefined,
    };

    return result;
  }

  static createPatient(
    values: FormValues,
    config: ConfigObject,
    patientUuidMap: PatientUuidMapType,
    initialAddressFieldValues: Record<string, any>,
    identifiers: Array<PatientIdentifier>,
  ): Patient {
    const attributes: Array<AttributeValue> = [];
    const addressFieldValues = FormManager.populateAddressValues(values, initialAddressFieldValues);
    if (config && config.personAttributeSections) {
      const { personAttributeSections } = config;
      for (const sections of personAttributeSections) {
        for (const attr of personAttributeSections.personAttributes) {
          attributes.push({
            attributeType: attr.uuid,
            value: values[attr.name],
          });
        }
      }
    }

    const person = {
      uuid: patientUuidMap['patientUuid'],
      names: FormManager.getNames(values, patientUuidMap),
      gender: values.gender.charAt(0),
      birthdate: values.birthdate,
      birthdateEstimated: values.birthdateEstimated,
      attributes: attributes,
      addresses: [addressFieldValues],
      ...FormManager.getDeathInfo(values),
    };

    const patient: Patient = {
      uuid: patientUuidMap['patientUuid'],
      person: { ...person },
      identifiers,
    };
    return patient;
  }
}
