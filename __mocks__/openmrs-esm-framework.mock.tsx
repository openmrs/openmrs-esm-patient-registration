import React from 'react';
import { never, of } from 'rxjs';

export const showToast = jest.fn();

export const interpolateString = jest.requireActual('@openmrs/esm-framework').interpolateString;

export const navigate = jest.requireActual('@openmrs/esm-framework').navigate;

export function openmrsFetch() {
  return new Promise(() => {});
}

export function openmrsObservableFetch() {
  return of({ data: { entry: [] } });
}

export function getCurrentPatient() {
  return jest.fn().mockReturnValue(never());
}

export function getAddressTemplateMock() {
  const predefinedAddressTemplate = {
    data: {
      results: [
        {
          value:
            '<org.openmrs.layout.address.AddressTemplate>\r\n     <nameMappings class="properties">\r\n       <property name="postalCode" value="Location.postalCode"/>\r\n       <property name="address2" value="Location.address2"/>\r\n       <property name="address1" value="Location.address1"/>\r\n       <property name="country" value="Location.country"/>\r\n       <property name="stateProvince" value="Location.stateProvince"/>\r\n       <property name="cityVillage" value="Location.cityVillage"/>\r\n     </nameMappings>\r\n     <sizeMappings class="properties">\r\n       <property name="postalCode" value="4"/>\r\n       <property name="address1" value="40"/>\r\n       <property name="address2" value="40"/>\r\n       <property name="country" value="10"/>\r\n       <property name="stateProvince" value="10"/>\r\n       <property name="cityVillage" value="10"/>\r\n       <asset name="cityVillage" value="10"/>\r\n     </sizeMappings>\r\n     <lineByLineFormat>\r\n       <string>address1 address2</string>\r\n       <string>cityVillage stateProvince postalCode</string>\r\n       <string>country</string>\r\n     </lineByLineFormat>\r\n     <elementDefaults class="properties">\r\n            <property name="country" value=""/>\r\n     </elementDefaults>\r\n     <elementRegex class="properties">\r\n            <property name="address1" value="[a-zA-Z]+$"/>\r\n     </elementRegex>\r\n     <elementRegexFormats class="properties">\r\n            <property name="address1" value="Countries can only be letters"/>\r\n     </elementRegexFormats>\r\n   </org.openmrs.layout.address.AddressTemplate>',
        },
      ],
    },
  };

  return Promise.resolve(predefinedAddressTemplate);
}

export function createErrorHandler() {
  return jest.fn().mockReturnValue(never());
}

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
  isUrlWithTemplateParameters: jest.fn(),
};

export enum Type {
  Array = 'Array',
  Boolean = 'Boolean',
  ConceptUuid = 'ConceptUuid',
  Number = 'Number',
  Object = 'Object',
  String = 'String',
  UUID = 'UUID',
}

export function UserHasAccess(props: any) {
  return props.children;
}

export const useConfig = jest.fn().mockReturnValue({
  buttons: {
    enabled: true,
    list: [
      {
        label: 'SPA Page',
        link: {
          spa: true,
          url: '/some/route',
        },
      },
      {
        label: 'RefApp Page',
        link: {
          spa: false,
          url: '/openmrs/some/route',
        },
      },
    ],
  },
});

export function useCurrentPatient() {
  return [undefined, null, null, null];
}

export const ComponentContext = React.createContext({
  moduleName: 'fake-module-config',
});

export const ExtensionSlot = ({ children }) => <>{children}</>;
