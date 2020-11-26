import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-config';
import { PatientRegistration } from './patient-registration/patient-registration.component';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';

defineConfigSchema('@openmrs/esm-patient-registration-app', esmPatientRegistrationSchema);

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route path="/patient-registration" component={PatientRegistration} />
    </BrowserRouter>
  );
}
