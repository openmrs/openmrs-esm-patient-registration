import { openmrsFetch } from '@openmrs/esm-api';
import { Patient } from './patient-registration-helper';

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

export function getCurrentUserLocation(abortController: AbortController) {
  return openmrsFetch('/ws/rest/v1/appui/session', {
    signal: abortController.signal,
  });
}

export function getUniquePatientIdentifier(abortController: AbortController) {
  return openmrsFetch('/module/idgen/generateIdentifier.form?source=1');
}

export const uuidTelephoneNumber = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
