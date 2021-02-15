import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function Root() {
  return (
    <ConfigurableLink className="omrs-link omrs-filled-neutral" to="${openmrsSpaBase}/patient-registration">
      Patient Registration
    </ConfigurableLink>
  );
}
