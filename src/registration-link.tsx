import React from 'react';
import { navigateToUrl } from 'single-spa';

export default function Root() {
  const className = `omrs-link omrs-filled-neutral`;
  const url = '/openmrs/spa/patient-registration';
  return (
    <a className={className} href={url} onClick={event => navigateToUrl(event, url)}>
      Patient Registration
    </a>
  );
}
