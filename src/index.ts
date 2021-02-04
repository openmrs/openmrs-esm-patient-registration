import { registerBreadcrumbs } from '@openmrs/esm-api';
import { defineConfigSchema } from '@openmrs/esm-config';
import { getAsyncExtensionLifecycle, getAsyncLifecycle } from '@openmrs/esm-react-utils';
import { backendDependencies } from './openmrs-backend-dependencies';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-patient-registration-app';
  const pageName = 'patient-registration';

  const options = {
    featureName: 'Patient Registration',
    moduleName,
  };

  defineConfigSchema(moduleName, esmPatientRegistrationSchema);

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/${pageName}`,
      title: 'Patient Registration',
      parent: `${window.spaBase}/home`,
    },
  ]);

  return {
    lifecycle: getAsyncLifecycle(() => import('./root.component'), options),
    activate: pageName,
    extensions: [
      {
        id: 'registration-home-link',
        slot: 'home-page-buttons',
        load: getAsyncExtensionLifecycle(() => import('./home-link'), options),
      },
      {
        id: 'registration-nav-link',
        slot: 'nav-menu',
        load: getAsyncExtensionLifecycle(() => import('./nav-link'), options),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
