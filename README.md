![Node.js CI](https://github.com/openmrs/openmrs-esm-patient-registration/workflows/Node.js%20CI/badge.svg)

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

## Installation

### Prerequisites

- [Node](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration)

### Setup Patient Registration Module

1. Clone the [openmrs-esm-patient-registration](https://github.com/openmrs/openmrs-esm-patient-registration) repo.
```sh
git clone https://github.com/openmrs/openmrs-esm-patient-registration.git
```
2. Install dependencies in the root directory of the repo.
```sh
npm i
```
3. Run the module from `localhost:8080`.
```sh
npm run serve -- --https
```

### Setup Dev Tools

1. Click `Add new module` in the dev tools window.
2. Type in the `Module Name:` `@openmrs/esm-patient-registration-app`.
3. Type in the `Override URL:` `8080`.
4. Go to the browser's development tools (e.g. via `Inspect`).
5. Go to the `Application` tab.
6. Go to `Local Storage`.
7. Find the key: `import-map-override:@openmrs/esm-patient-registration-app`
8. Update the corresponding value to: `//localhost:8080/openmrs-esm-patient-registration.js`.
9. Click on the padlock/warning message next to the URL in the browser.
10. Select the `Allow` option from the `Insecure content` dropdown in the browser settings page.
11. Refresh the page.

## Tests

To verify that all of the tests run:
```
npm test
```
*Note: Run `npm i` before running tests for the first time.*

## Deployment

The `master` branch of this repo is deployed in a [demo environment](https://openmrs-spa.org/openmrs/spa/patient-registration).

## Configuration

This module is designed to be driven by configuration files. These files define the look and functionality required to drive the Patient Registration module.

## Resources

- [JIRA Epic](https://issues.openmrs.org/browse/MF-248)

## License

The project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
