import { openmrsFetch } from '@openmrs/esm-api';
import { Patient, tempRelationship } from './patient-registration-helper';

export function savePatient(abortController: AbortController, patient: Patient) {
  return openmrsFetch('/ws/rest/v1/patient', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: patient,
    signal: abortController.signal,
  });
}

export function saveRelationships(abortController: AbortController, relationships: tempRelationship) {
  return openmrsFetch('/ws/rest/v1/relationship', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: relationships,
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

export const uuidIdentifier = '05a29f94-c0ed-11e2-94be-8c13b969e334';
export const uuidTelephoneNumber = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
export function getAllRelationshipTypes(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/relationshiptype?v=default', {
    signal: abortController.signal,
  });
}

export function getPerson(abortController: AbortController, searchString: string) {
  return openmrsFetch('/ws/rest/v1/person?q=' + searchString, {
    signal: abortController.signal,
  });
}
