import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PatientRegistration, PatientRegistrationProps } from './patient-registration/patient-registration.component';

export interface RootProps extends PatientRegistrationProps {}

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/patient-registration" render={() => <PatientRegistration {...props} />} />
      <Route exact path="/patient/:patientUuid/edit" render={() => <PatientRegistration {...props} />} />
    </BrowserRouter>
  );
}
