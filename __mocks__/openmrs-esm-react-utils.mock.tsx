import React from 'react';

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
