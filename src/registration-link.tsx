import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { navigateToUrl } from 'single-spa';

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RegistrationLink,
});

export function RegistrationLink(props) {
  const className = `omrs-link omrs-filled-neutral`;
  const url = '/openmrs/spa/patient-registration';
  const button = (
    <a className={className} href={url} onClick={event => navigateToUrl(event, url)}>
      Patient Registration
    </a>
  );
  return button;
}
