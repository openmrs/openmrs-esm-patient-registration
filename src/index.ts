import { defineConfigSchema } from '@openmrs/esm-config';
import { getAsyncLifecycle } from '@openmrs/esm-react-utils';
import { backendDependencies } from './openmrs-backend-dependencies';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-patient-registration-app';

  const options = {
    featureName: 'Patient Registration',
    moduleName,
  };

  defineConfigSchema(moduleName, esmPatientRegistrationSchema);

  return {
    lifecycle: getAsyncLifecycle(() => import('./root.component'), options),
    activate: 'patient-registration',
    extensions: [
      {
        id: 'registration-link',
        slot: 'home-page-buttons',
        load: getAsyncLifecycle(() => import('./registration-link'), options),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
