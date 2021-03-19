import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PatientRegistration } from './patient-registration/patient-registration.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/patient-registration" component={PatientRegistration} />
      <Route exact path="/patient/:patientUuid/edit" component={PatientRegistration} />
    </BrowserRouter>
  );
}
