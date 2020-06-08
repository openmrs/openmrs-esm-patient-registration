import React from 'react';
import { defineConfigSchema } from '@openmrs/esm-module-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import { BrowserRouter } from 'react-router-dom';

defineConfigSchema('@openmrs/esm-patient-registration-app', {});

function Root(props) {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <div>Fill me with content!</div>
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'patient-registration',
  moduleName: '@openmrs/esm-patient-registration-app',
})(Root);
