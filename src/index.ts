import { ExtensionDefinition, attach } from '@openmrs/esm-extensions';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const extensions: Array<ExtensionDefinition> = [
  {
    name: 'registration-link',
    load: () => import('./registration-link'),
  },
];

function setupOpenMRS() {
  return {
    lifecycle: () => import('./openmrs-esm-patient-registration'),
    activate: 'patient-registration',
    extensions: extensions,
  };
}

attach('home-page-buttons', 'registration-link');

export { backendDependencies, importTranslation, setupOpenMRS };
