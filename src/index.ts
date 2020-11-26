import { getAsyncLifecycle } from '@openmrs/esm-react-utils';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  return {
    lifecycle: getAsyncLifecycle(() => import('./root.component'), {
      featureName: 'Patient Registration',
      moduleName: '@openmrs/esm-patient-registration-app',
    }),
    activate: 'patient-registration',
    extensions: [
      {
        id: 'registration-link',
        slot: 'home-page-buttons',
        load: () => import('./registration-link'),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
