import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact, { singleSpaNavigate } from 'single-spa-react';

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RegistrationLink,
});

export function RegistrationLink(props) {
  const className = `omrs-link omrs-filled-neutral`;
  const url = '/openmrs/spa/patient-registration';
  const button = (
    <a className={className} href={url} onClick={event => singleSpaNavigate(event, url)}>
      Patient Registration
    </a>
  );
  return button;
}
