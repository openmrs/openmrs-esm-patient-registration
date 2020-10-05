import { openmrsFetch } from '@openmrs/esm-api';
import { Patient, tempRelationship } from './patient-registration-helper';
import { camelCase } from 'lodash';
import { mockAutoGenerationOptionsResult } from '../../__mocks__/autogenerationoptions.mock';

export function savePatient(abortController: AbortController, patient: Patient, patientUuid: string) {
  const url = patientUuid ? '/ws/rest/v1/patient/' + patientUuid : '/ws/rest/v1/patient/';
  return openmrsFetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: patient,
    signal: abortController.signal,
  });
}

export function saveRelationship(abortController: AbortController, relationship: tempRelationship) {
  return openmrsFetch('/ws/rest/v1/relationship', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: relationship,
    signal: abortController.signal,
  });
}

export function getCurrentUserLocation(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/appui/session', {
    signal: abortController.signal,
  });
}

export function getUniquePatientIdentifier(abortController: AbortController) {
  return openmrsFetch('/module/idgen/generateIdentifier.form?source=1');
}

export function getPrimaryIdentifierType(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/metadatamapping/termmapping?v=full&code=emr.primaryIdentifierType', {
    signal: abortController.signal,
  }).then(response => {
    return openmrsFetch('/ws/rest/v1/patientidentifiertype/' + response.data.results[0].metadataUuid, {
      signal: abortController.signal,
    }).then(response => ({
      name: response.data.name,
      fieldName: camelCase(response.data.name),
      required: response.data.required,
      uuid: response.data.uuid,
      format: response.data.format,
      isPrimary: true,
    }));
  });
}

export async function getSecondaryIdentifierTypes(abortController: AbortController) {
  const response = await openmrsFetch(
    '/ws/rest/v1/metadatamapping/termmapping?v=full&code=emr.extraPatientIdentifierTypes',
    {
      signal: abortController.signal,
    },
  );
  if (response.data.results) {
    const extraIdentifierTypesSetUuid = response.data.results[0].metadataUuid;
    const secIdSet = await openmrsFetch(
      '/ws/rest/v1/metadatamapping/metadataset/' + extraIdentifierTypesSetUuid + '/members',
      {
        signal: abortController.signal,
      },
    );
    if (secIdSet.data.results) {
      const ret = await Promise.all(
        secIdSet.data.results.map(async setMember => {
          const type = await openmrsFetch('/ws/rest/v1/patientidentifiertype/' + setMember.metadataUuid, {
            signal: abortController.signal,
          });
          return {
            name: type.data.name,
            fieldName: camelCase(type.data.name),
            required: type.data.required,
            uuid: type.data.uuid,
            format: response.data.format,
            isPrimary: false,
          };
        }),
      );
      return ret;
    }
  }
}

export function getAddressTemplate(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/systemsetting?q=layout.address.format&v=custom:(value)', {
    signal: abortController.signal,
  });
}

export function getIdentifierSources(identifierType: string, abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/idgen/identifiersource?v=full&identifierType=' + identifierType, {
    signal: abortController.signal,
  });
}

export function getAutoGenerationOptions(identifierType: string, abortController: AbortController) {
  // return openmrsFetch('/ws/rest/v1/idgen/autogenerationoption?v=full&identifierType=' + identifierType, {
  //   signal: abortController.signal,
  // });
  return Promise.resolve(mockAutoGenerationOptionsResult);
}

export function generateIdentifier(source: string, abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/idgen/identifiersource/' + source + '/identifier', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {},
  });
}

export function deletePersonName(nameUuid: string, personUuid: string, abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/person/' + personUuid + '/name/' + nameUuid, {
    method: 'DELETE',
    signal: abortController.signal,
  });
}

export const uuidIdentifier = '05a29f94-c0ed-11e2-94be-8c13b969e334';
export const uuidTelephoneNumber = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
export function getAllRelationshipTypes(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/relationshiptype?v=default', {
    signal: abortController.signal,
  });
}

export function searchPerson(abortController: AbortController, searchString: string) {
  return openmrsFetch('/ws/rest/v1/person?q=' + searchString, {
    signal: abortController.signal,
  });
}
