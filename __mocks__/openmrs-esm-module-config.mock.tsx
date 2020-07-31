import React from 'react';
import { ConfigMock } from './openmrs-esm-config.mock';

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
};

export const mockConfig = jest.fn().mockReturnValue(ConfigMock);

export const ModuleNameContext = React.createContext('fake-module-config');
