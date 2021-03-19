module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(scss)$': 'identity-obj-proxy',
    '^@carbon/icons-react/es/(.*)$': '@carbon/icons-react/lib/$1',
    '^carbon-components-react/es/(.*)$': 'carbon-components-react/lib/$1',
    '@openmrs/esm-framework': '@openmrs/esm-framework/mock',
    '^lodash-es/(.*)$': 'lodash/$1',
  },
};
