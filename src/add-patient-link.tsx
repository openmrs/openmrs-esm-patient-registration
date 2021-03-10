import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { Add20 } from '@carbon/icons-react';
import { HeaderGlobalAction } from 'carbon-components-react/es/components/UIShell';

export default function Root() {
  return (
    <HeaderGlobalAction
    aria-label="Add" aria-labelledby="Add Patient" name="AddPatientIcon">
      <ConfigurableLink to="${openmrsSpaBase}/patient-registration">
        <Add20 />
      </ConfigurableLink>
    </HeaderGlobalAction>

  );
}
