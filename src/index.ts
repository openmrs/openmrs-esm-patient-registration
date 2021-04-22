import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle, makeUrl } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';
import { Workbox } from 'workbox-window';
import {
  fetchAddressTemplate,
  fetchAllRelationshipTypes,
  fetchCurrentUserLocation,
  fetchPatientIdentifierTypesWithSources,
} from './patient-registration/patient-registration.resource';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  TODO_TMP_MOVE_ME_LATER_registerDynamicRoutes();

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
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root.component'), options),
        route: /^patient-registration/,
        online: true,
        offline: true,
      },
      {
        load: getAsyncLifecycle(() => import('./root.component'), {
          featureName: 'edit-patient-details-form',
          moduleName,
        }),
        route: /^patient\/([a-zA-Z0-9\-]+)\/edit/,
      },
    ],
    extensions: [
      {
        id: 'registration-home-link',
        slot: 'homepage-dashboard-slot',
        load: getAsyncLifecycle(() => import('./home-link'), options),
      },
      {
        id: 'patient-photo-widget',
        slot: 'patient-photo-slot',
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

function TODO_TMP_MOVE_ME_LATER_registerDynamicRoutes() {
  const wb = new Workbox(`${window.getOpenmrsSpaBase()}service-worker.js`);
  wb.register();

  // Warning: Super super ugly.
  // Currently gives the page some time to setup the SW and then registers the URLs which this MF wants cached.
  // This must 100% be invoked by the app shell.
  setTimeout(async () => {
    console.warn('PRECACHING START');

    await Promise.all([
      cacheUrl('/ws/rest/v1/metadatamapping/termmapping\\?v=full&code=emr.primaryIdentifierType'),
      cachePattern('/ws/rest/v1/patientidentifiertype/.+'),

      cacheUrl('/ws/rest/v1/metadatamapping/termmapping\\?v=full&code=emr.extraPatientIdentifierTypes'),
      cachePattern('/ws/rest/v1/metadatamapping/metadataset/.+/members'),
      cachePattern('/ws/rest/v1/patientidentifiertype/.+'),
      cachePattern('/ws/rest/v1/idgen/identifiersource\\?v=full&identifierType=.+'),

      cacheUrl('/ws/rest/v1/systemsetting?q=layout.address.format&v=custom:(value)'),
      cacheUrl('/ws/rest/v1/relationshiptype?v=default'),
    ]);

    const ac = new AbortController();

    await Promise.all([
      fetchAllRelationshipTypes(ac),
      fetchAddressTemplate(ac),
      fetchCurrentUserLocation(ac),
      fetchPatientIdentifierTypesWithSources(ac),
    ]);
  });

  function cacheUrl(url: string) {
    const fullUrl = new URL(makeUrl(url), window.location.origin).href;
    return wb.messageSW({
      type: 'registerDynamicRoute',
      url: fullUrl,
    });
  }

  function cachePattern(pattern: string) {
    return wb.messageSW({
      type: 'registerDynamicRoute',
      pattern: `.+${pattern}`,
    });
  }
}

export { backendDependencies, importTranslation, setupOpenMRS };
