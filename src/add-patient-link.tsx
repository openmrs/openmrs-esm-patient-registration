import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { Add20 } from "@carbon/icons-react";

export default function Root() {
  return (
    <ConfigurableLink to="${openmrsSpaBase}/patient-registration">
      <Add20 />
    </ConfigurableLink>
  );
}
