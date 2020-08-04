[![Build Status](https://travis-ci.com/openmrs/openmrs-esm-patient-registration.svg?branch=master)](https://travis-ci.com/github/openmrs/openmrs-esm-patient-registration)

# Patient Registration ESM
The Patient Registration MF module for OpenMRS Version 3.0 Frontend. The Patient Registration facilitates the registration of a new patient.

## Overview
The Patient Registration module consists of a configurable form consisting of multiple custom/basic inputs (fields).

## Built With
* [React (TypeScript)](https://reactjs.org/) - Front-end JS library
* [Formik](https://formik.org/docs/overview) - Form builder JS library
* [Day.js](https://day.js.org/) - Date library
* [Jest](https://jestjs.io/) - JS testing framework
* [React Testing Library](https://testing-library.com/) - JS testing library for React components
* [npm](https://www.npmjs.com/) - Node package manager
* [webpack](https://webpack.js.org/) - JS module bundler
* [ESLint](https://eslint.org/) - JS linter
* [Prettier](https://prettier.io/) - Code formatter
* [Babel](https://babeljs.io/) - JS compiler
* [Travis CI](https://travis-ci.org/) - CI service

## Installation
### Prerequisites
- [Node](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration)

### Setup Patient Registration Module
1. Clone the [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration) repo.
```
git clone https://github.com/openmrs/openmrs-esm-patient-registration.git
```
1. Install dependencies in the root directory of the repo.
```
npm i
```
1. Run the module from `localhost:8080`.
```
npm start -- --https
```

### Setup Dev Tools
1. Click `Add new module` in the dev tools window.
1. Type in the `Module Name:` `@openmrs/esm-patient-registration-app`.
1. Type in the `Override URL:` `8080`.
1. Go to the browser's development tools (e.g. via `Inspect`).
1. Go to the `Application` tab.
1. Go to `Local Storage`.
1. Find the key: `import-map-override:@openmrs/esm-patient-registration-app`
1. Update the corresponding value to: `//localhost:8080/openmrs-esm-patient-registration.js`.
1. Click on the padlock/warning message next to the URL in the browser.
1. Select the `Allow` option from the `Insecure content` dropdown in the browser settings page.
1. Refresh the page.

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

## Acknowledgements
* [Nick Hill](https://github.com/nickjhill14) - maintainance, design, analysis, onboarding, and development.
* [Florian Rappl](https://github.com/FlorianRappl) - module scaffolding, onboarding, guidance, and review.
* [Romain Buisson](https://github.com/rbuisson) - design, inception, and guidance.
* [Dimitri Renault](https://github.com/mks-d) - design, inception, and guidance.
* [Helena Lyhme](https://github.com/illyz) - inception, onboarding, and analysis.
* [Lucas Kummer](https://github.com/trepolus) - design, analysis, and development.

## License
The project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
