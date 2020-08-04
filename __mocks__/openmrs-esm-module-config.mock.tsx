import React from 'react';

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
};

export const ConfigMock = {
  personAttributes: [
    {
      label: 'Telephone Number',
      uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
      placeholder: 'Enter Telephone Number',
      validation: { required: true },
    },
    {
      label: 'Birth place',
      uuid: '8d8718c2-c2cc-11de-8d13-0010c6dffd0f',
      placeholder: 'Enter Birth Place',
      validation: { required: true },
    },
  ],
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
};

export const mockConfig = jest.fn().mockReturnValue(ConfigMock);

export const ModuleNameContext = React.createContext('fake-module-config');
