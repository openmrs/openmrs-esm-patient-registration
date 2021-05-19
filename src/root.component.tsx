import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { syncAddedPatients } from './offline';
import { Resources, ResourcesContext } from './offline.resources';
import { SavePatientForm } from './patient-registration/form-manager';
import { PatientIdentifierType } from './patient-registration/patient-registration-types';
import { PatientRegistration, PatientRegistrationProps } from './patient-registration/patient-registration.component';

export interface RootProps extends PatientRegistrationProps, Resources {
  syncAddedPatientsOnLoad: boolean;
  savePatientForm: SavePatientForm;
}

export default function Root({
  currentSession,
  addressTemplate,
  relationshipTypes,
  patientIdentifiers,
  syncAddedPatientsOnLoad,
  savePatientForm,
}: RootProps) {
  const resources = {
    currentSession,
    addressTemplate,
    relationshipTypes,
    patientIdentifiers,
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (syncAddedPatientsOnLoad) {
      syncAddedPatients(abortController);
    }
    return () => abortController.abort();
  }, [syncAddedPatientsOnLoad]);

  return (
    <ResourcesContext.Provider value={resources}>
      <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
        <Route
          exact
          path="/patient-registration"
          render={props => <PatientRegistration savePatientForm={savePatientForm} {...props} />}
        />
        <Route
          exact
          path="/patient/:patientUuid/edit"
          render={props => <PatientRegistration savePatientForm={savePatientForm} {...props} />}
        />
      </BrowserRouter>
    </ResourcesContext.Provider>
  );
}
