[![Build Status](https://travis-ci.org/openmrs/openmrs-esm-patient-registration.svg?branch=master)](https://travis-ci.org/openmrs/openmrs-esm-patient-registration)

# Patient Registration ESM
The Patient Registration form micro-frontend for OpenMRS SPA. It includes a configurable dashboard and form fields for new patient data.

## Overview
The Patient Registration module is divided into 3 separate component types: Root, PatientRegistration, and Fields.

## Built With
- [React (TypeScript)](https://reactjs.org/) - Front-end JS library
- [Jest](https://jestjs.io/) - JS testing framework
- [React Testing Library](https://testing-library.com/) - JS testing library for React components
- [npm](https://www.npmjs.com/) - Node package manager
- [webpack](https://webpack.js.org/) - JS module bundler
- [ESLint](https://eslint.org/) - JS linter
- [Prettier](https://prettier.io/) - Code formatter
- [Babel](https://babeljs.io/) - JS compiler
- [Travis CI](https://travis-ci.org/) - CI service

## Installation

### Prerequisites
- [Node](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration)

### Setup Patient Registration Module
1. Clone the [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration) repo
```
git clone https://github.com/openmrs/openmrs-esm-patient-registration.git
```
2. Install dependencies in the root directory of the repo
```
npm i
```
3. Run the module from `localhost:8080`
```
npm start -- --https
```

*Note: the module URL: [https://openmrs-spa.org/openmrs/spa/patient-registration](https://openmrs-spa.org/openmrs/spa/patient-registration).*

### Setup Dev Tools
1. Click `Add new module` in the dev tools window
2. Type in the `Module Name:` `@openmrs/esm-patient-registration-app`
3. Type in the `Override URL:` `8080`
4. Go to the browser's development tools (e.g. via `Inspect`)
5. Go to the `Application` tab
6. Go to `Local Storage`
7. Find the key: `import-map-override:@openmrs/esm-patient-registration-app`
8. Update the corresponding value to: `//localhost:8080/openmrs-esm-patient-registration.js`
9.  Refresh the page

## Tests
To verify that all of the tests run:
```
npm test
```
*Note: Run `npm i` before running tests for the first time.*

## Deployment
Currently, there are no releases for this module and it can only be locally deployed by following the installation instructions.

## Configuration
This module is designed to be driven by configuration files. These files define the look and functionality required to drive the Patient Registration module.

*Note: Currently, the module cannot be configured as it is in the early stages of development.*

## Resources
- [JIRA Epic](https://issues.openmrs.org/browse/MF-248)
- [Wiki](https://wiki.openmrs.org/display/projects/openmrs-esm-patient-registration)

## Authors
- [Nick Hill](https://github.com/nickjhill14)
- [Lucas Kummer](https://github.com/trepolus)
- [Florian Rappl](https://github.com/FlorianRappl)

## Acknowledgements
- [Florian Rappl](https://github.com/FlorianRappl) - scaffolding and setting up the module as well as onboarding the dev team
- Romain Buisson - design, inception, and analysis
- Helena Lyhme - design, inception, and analysis
- Susanna Schiavi - design, inception, and analysis

## License
The project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
