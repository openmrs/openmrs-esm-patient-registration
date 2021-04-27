import {
  PatientIdentifier,
  FormValues,
  PatientIdentifierType,
  AttributeValue,
  PatientUuidMapType,
  Patient,
  CapturePhotoProps,
} from './patient-registration-types';
import {
  deletePersonName,
  generateIdentifier,
  savePatient,
  savePatientPhoto,
  saveRelationship,
} from './patient-registration.resource';
import { ConfigObject } from '@openmrs/esm-framework';
import { PatientRegistrationDb } from '../offline';

export type SavePatientForm = (
  values: FormValues,
  patientUuidMap: PatientUuidMapType,
  initialAddressFieldValues: Record<string, any>,
  identifierTypes: Array<PatientIdentifierType>,
  capturePhotoProps: CapturePhotoProps,
  currentLocation: string,
  config?: ConfigObject,
  abortController?: AbortController,
) => Promise<string | null>;

export default class FormManager {
  static async savePatientFormOffline(
    values: FormValues,
    patientUuidMap: PatientUuidMapType,
    initialAddressFieldValues: Record<string, any>,
    identifierTypes: Array<PatientIdentifierType>,
    capturePhotoProps: CapturePhotoProps,
    currentLocation: string,
    config: ConfigObject,
  ): Promise<null> {
    const db = new PatientRegistrationDb();
    await db.patientRegistrations.add({
      formValues: values,
      patientUuidMap,
      initialAddressFieldValues,
      identifierTypes,
      capturePhotoProps,
      currentLocation,
      config,
    });

    return null;
  }

  static async savePatientFormOnline(
    values: FormValues,
    patientUuidMap: PatientUuidMapType,
    initialAddressFieldValues: Record<string, any>,
    identifierTypes: Array<PatientIdentifierType>,
    capturePhotoProps: CapturePhotoProps,
    currentLocation: string,
    config: ConfigObject,
    abortController: AbortController,
  ): Promise<string> {
    const patientIdentifiers = await FormManager.getPatientIdentifiersToCreate(
      values,
      patientUuidMap,
      identifierTypes,
      abortController,
      currentLocation,
    );

    const createdPatient = FormManager.getPatientToCreate(
      values,
      config,
      patientUuidMap,
      initialAddressFieldValues,
      patientIdentifiers,
    );

    FormManager.getDeletedNames(patientUuidMap).forEach(async name => {
      await deletePersonName(name.nameUuid, name.personUuid, abortController);
    });

    const savePatientResponse = await savePatient(abortController, createdPatient, patientUuidMap.patientUuid);
    if (savePatientResponse.ok) {
      values.relationships.map(({ relatedPerson: relatedPersonUuid, relationship }) => {
        const relationshipType = relationship.split('/')[0];
        const direction = relationship.split('/')[1];
        const thisPatientUuid = savePatientResponse.data.uuid;
        const isAToB = direction === 'aIsToB';
        const relationshipToSave = {
          personA: isAToB ? relatedPersonUuid : thisPatientUuid,
          personB: isAToB ? thisPatientUuid : relatedPersonUuid,
          relationshipType,
        };

        saveRelationship(abortController, relationshipToSave);
      });

      if (capturePhotoProps && (capturePhotoProps.base64EncodedImage || capturePhotoProps.imageFile)) {
        savePatientPhoto(
          savePatientResponse.data.uuid,
          capturePhotoProps.imageFile,
          null,
          abortController,
          capturePhotoProps.base64EncodedImage,
          '/ws/rest/v1/obs',
          capturePhotoProps.photoDateTime,
          config.concepts.patientPhotoUuid,
        );
      }
    }

    return savePatientResponse.data.uuid;
  }

  static getPatientIdentifiersToCreate(
    values: FormValues,
    patientUuidMap: object,
    identifierTypes: Array<PatientIdentifierType>,
    abortController: AbortController,
    location: string,
  ) {
    const identifierTypeRequests: Array<Promise<PatientIdentifier>> = identifierTypes.map(async type => {
      const idValue = values[type.fieldName];
      if (idValue) {
        return {
          uuid: patientUuidMap[type.fieldName] ? patientUuidMap[type.fieldName].uuid : undefined,
          identifier: idValue,
          identifierType: type.uuid,
          location: location,
          preferred: type.isPrimary,
        };
      } else if (type.autoGenerationSource) {
        const generateIdentifierResponse = await generateIdentifier(type.autoGenerationSource.uuid, abortController);
        return {
          // is this undefined?
          uuid: undefined,
          identifier: generateIdentifierResponse.data.identifier,
          identifierType: type.uuid,
          location: location,
          preferred: type.isPrimary,
        };
      } else {
        // This is a case that should not occur.
        // If it did, the subsequent network request (when creating the patient) would fail with
        // BadRequest since the (returned) identifier type is undefined.
        // Better stop early.
        throw new Error('No approach for generating a patient identifier could be found.');
      }
    });

    return Promise.all(identifierTypeRequests);
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

  static getDeathInfo(values: FormValues) {
    const { isDead, deathDate, deathCause } = values;
    const result = {
      dead: isDead,
      deathDate: isDead ? deathDate : undefined,
      causeOfDeath: isDead ? deathCause : undefined,
    };

    return result;
  }

  static getPatientToCreate(
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
