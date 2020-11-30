import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PatientRegistration } from './patient-registration/patient-registration.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route path="/patient-registration" component={PatientRegistration} />
    </BrowserRouter>
  );
}
