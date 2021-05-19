import {
  registerBreadcrumbs,
  defineConfigSchema,
  getAsyncLifecycle,
  makeUrl,
  useSessionUser,
} from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import { esmPatientRegistrationSchema } from './config-schemas/openmrs-esm-patient-registration-schema';
import { Workbox } from 'workbox-window';
import { fetchCurrentSession, fetchAddressTemplate, fetchPatientIdentifierTypesWithSources, fetchAllRelationshipTypes } from './offline.resources';
import FormManager from './patient-registration/form-manager';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  TMP_WORKAROUND_registerAndPrecacheStaticApiEndpoints();

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
        online: {
          syncAddedPatientsOnLoad: true,
          savePatientForm: FormManager.savePatientFormOnline,
        },
        offline: {
          syncAddedPatientsOnLoad: false,
          savePatientForm: FormManager.savePatientFormOffline,
        },
        resources: {
          currentSession: fetchCurrentSession,
          addressTemplate: fetchAddressTemplate,
          relationshipTypes: fetchAllRelationshipTypes,
          patientIdentifiers: fetchPatientIdentifierTypesWithSources,
        },
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
        id: 'add-patient-action',
        slot: 'top-nav-actions-slot',
        load: getAsyncLifecycle(() => import('./add-patient-link'), options),
        online: true,
        offline: true,
      },
      {
        id: 'patient-photo-widget',
        slot: 'patient-photo-slot',
        load: getAsyncLifecycle(() => import('./widgets/display-photo.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'edit-patient-details-button',
        slot: 'patient-actions-slot',
        load: getAsyncLifecycle(() => import('./widgets/edit-patient-details-button.component'), options),
        online: true,
        offline: true,
      },
    ],
  };
}

/**
 * Called during startup. Notifies the service worker of routes that this MF requires in cache
 * for offline mode.
 * Also fetches the data once so that it is actually cached.
 *
 * This is a temporary workaround because the app shell is currently missing a dedicated API
 * for registering routes to precache.
 * This will be removed with MF-572 and MF-573.
 */
function TMP_WORKAROUND_registerAndPrecacheStaticApiEndpoints() {
  const wb = new Workbox(`${window.getOpenmrsSpaBase()}service-worker.js`);
  wb.register();

  (async () => {
    await Promise.all([
      // cacheUrl('/ws/rest/v1/metadatamapping/termmapping?v=full&code=emr.primaryIdentifierType'),
      // cachePattern('/ws/rest/v1/patientidentifiertype/.+'),
      cacheUrl('/ws/rest/v1/metadatamapping/termmapping?v=full&code=emr.extraPatientIdentifierTypes'),
      cachePattern('/ws/rest/v1/metadatamapping/metadataset/.+/members'),
      cachePattern('/ws/rest/v1/patientidentifiertype/.+'),
      cachePattern('/ws/rest/v1/idgen/identifiersource\\?v=full&identifierType=.+'),
      cacheUrl('/ws/rest/v1/systemsetting?q=layout.address.format&v=custom:(value)'),
      cacheUrl('/ws/rest/v1/relationshiptype?v=default'),
    ]);

    const ac = new AbortController();
    await Promise.all([
      fetchCurrentSession(ac),
      fetchPatientIdentifierTypesWithSources(ac),
      fetchAddressTemplate(ac),
      fetchAllRelationshipTypes(ac),
    ]);
  })();

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
