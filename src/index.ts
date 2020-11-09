import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  return {
    lifecycle: () => import('./openmrs-esm-patient-registration'),
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
