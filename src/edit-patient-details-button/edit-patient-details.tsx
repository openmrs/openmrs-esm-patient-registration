import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, useCurrentPatient, ExtensionSlot } from '@openmrs/esm-framework';

export default function EditPatientDetailsOverflowMenuItem() {
  const [isLoadingPatient, existingPatient, patientUuid, patientErr] = useCurrentPatient();
  const { t } = useTranslation();
  return (
    <ConfigurableLink
      to={`\${openmrsSpaBase}/patient/${patientUuid}/edit/`}
      style={{
        textDecoration: 'none',
      }}>
      <ExtensionSlot
        extensionSlotName="custom-overflow-menu-item"
        state={{
          itemText: t('Edit Patient Details', 'Edit Patient Details'),
        }}
      />
    </ConfigurableLink>
  );
}
