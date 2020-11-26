import { getAsyncLifecycle } from '@openmrs/esm-react-utils';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'Patient Registration',
  moduleName: '@openmrs/esm-patient-registration-app',
};

function setupOpenMRS() {
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
