import './set-public-path';
import { routePrefix } from '@openmrs/esm-root-config';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  return {
    lifecycle: () => import('./openmrs-esm-patient-registration'),
    activate: location => routePrefix('patient-registration', location),
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };