import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { syncAddedPatients } from './offline';
import { SavePatientForm } from './patient-registration/form-manager';
import { PatientRegistration, PatientRegistrationProps } from './patient-registration/patient-registration.component';

export interface RootProps extends PatientRegistrationProps {
  syncAddedPatientsOnLoad: boolean;
  savePatientForm: SavePatientForm;
}

export default function Root({ syncAddedPatientsOnLoad, savePatientForm }: RootProps) {
  useEffect(() => {
    const abortController = new AbortController();
    if (syncAddedPatientsOnLoad) {
      syncAddedPatients(abortController);
    }
    return () => abortController.abort();
  }, [syncAddedPatientsOnLoad]);

  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route
        exact
        path="/patient-registration"
        render={() => <PatientRegistration savePatientForm={savePatientForm} />}
      />
      <Route
        exact
        path="/patient/:patientUuid/edit"
        render={() => <PatientRegistration savePatientForm={savePatientForm} />}
      />
    </BrowserRouter>
  );
}
