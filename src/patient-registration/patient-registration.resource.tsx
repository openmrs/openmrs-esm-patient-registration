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

export const uuidIdentifier = '05a29f94-c0ed-11e2-94be-8c13b969e334';
