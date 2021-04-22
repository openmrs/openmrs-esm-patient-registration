import Dexie, { Table } from 'dexie';
import {
  CapturePhotoProps,
  FormValues,
  PatientIdentifierType,
  PatientUuidMapType,
} from './patient-registration/patient-registration-types';

/**
 * Stores offline data of the primary navigation MF.
 */
export class PatientRegistrationDb extends Dexie {
  patientRegistrations: Table<PatientRegistration, number>;

  constructor() {
    super('EsmPatientRegistration');

    this.version(1).stores({
      patientRegistrations: '++id',
    });

    this.patientRegistrations = this.table('patientRegistrations');
  }
}

/**
 * An entity storing a change of a logged in a user's properties.
 */
export interface PatientRegistration {
  id?: number;
  formValues: FormValues;
  patientUuidMap: PatientUuidMapType;
  initialAddressFieldValues: Record<string, any>;
  identifierTypes: Array<PatientIdentifierType>;
  capturePhotoProps: CapturePhotoProps;
  currentLocation: string;
}
