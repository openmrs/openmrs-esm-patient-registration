import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import Add20 from '@carbon/icons-react/es/add/20';
import { HeaderGlobalAction } from 'carbon-components-react/es/components/UIShell';
import styles from './add-patient-link.css';
export default function Root() {
  return (
    <HeaderGlobalAction
      aria-label="Add Patient"
      aria-labelledby="Add Patient"
      name="AddPatientIcon"
      className={styles.slotStyles}>
      <ConfigurableLink className={styles.iconStyle} to="${openmrsSpaBase}/patient-registration">
        <Add20 />
      </ConfigurableLink>
    </HeaderGlobalAction>
  );
}
