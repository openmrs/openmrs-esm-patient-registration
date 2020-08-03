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
export const uuidContactPerson = {
  givenName: '63b69b3d-38b2-4a34-a8ed-e2faccbe0c2e',
  middleName: '604c6925-2a07-43f9-8fd9-c201496b7c06',
  familyName: 'b9bc03a0-5425-46c7-95ca-403605b40b3c',
  telephoneNumber: '427fdcdf-8ebf-4ec8-91a6-2f86950f2fb9',
  relationship: '7c792735-2301-4070-a3d7-77703f6da9f4',
};
