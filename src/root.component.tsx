import React from 'react';
import { defineConfigSchema } from '@openmrs/esm-module-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import { BrowserRouter } from 'react-router-dom';
import { PatientRegistration } from './patient-registration/patient-registration.component';

defineConfigSchema('@openmrs/esm-patient-registration', {});

function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <main className="omrs-main-content">
        <PatientRegistration />
      </main>
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'patient-registration',
  moduleName: '@openmrs/esm-patient-registration',
})(Root);
