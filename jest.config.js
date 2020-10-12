module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '@openmrs/esm-api': '<rootDir>/__mocks__/openmrs-esm-api.mock.tsx',
    '@openmrs/esm-config': '<rootDir>/__mocks__/openmrs-esm-module-config.mock.tsx',
    '@openmrs/esm-error-handling': '<rootDir>/__mocks__/openmrs-esm-error-handling.mock.tsx',
    '@openmrs/esm-styleguide': '<rootDir>/__mocks__/openmrs-esm-styleguide.mock.tsx',
  },
};
