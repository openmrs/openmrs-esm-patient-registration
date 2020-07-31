import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-module-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import { PatientRegistration } from './patient-registration/patient-registration.component';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';

defineConfigSchema('@openmrs/esm-patient-registration-app', esmPatientRegistrationSchema);

function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route path="/patient-registration" component={PatientRegistration} />
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'patient-registration',
  moduleName: '@openmrs/esm-patient-registration-app',
})(Root);
