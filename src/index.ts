import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
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
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root.component'), options),
        route: /^patient-registration/,
      },
      {
        load: getAsyncLifecycle(() => import('./root.component'), {
          featureName: 'edit-patient-details-form',
          moduleName,
        }),
        route: /^patient\/.+\/edit/,
      },
    ],
    extensions: [
      {
        id: 'registration-home-link',
        slot: 'home-page-buttons',
        load: getAsyncLifecycle(() => import('./home-link'), options),
      },
      {
        id: 'registration-nav-link',
        slot: 'nav-menu',
        load: getAsyncLifecycle(() => import('./nav-link'), options),
      },
      {
        id: 'patient-photo-widget',
        slot: 'patient-photo',
        load: getAsyncLifecycle(() => import('./widgets/display-photo.component'), options),
      },
      {
        id: 'add-patient-action',
        slot: 'top-nav-actions-slot',
        load: getAsyncLifecycle(() => import('./add-patient-link'), options),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
