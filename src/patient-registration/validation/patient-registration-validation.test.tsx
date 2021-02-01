import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { validationSchema } from './patient-registration-validation';
import { SelectInput } from '../input/basic-input/select/select-input.component';
import { EstimatedAgeInput } from './../input/custom-input/estimated-age/estimated-age-input.component';
import { Input } from '../input/basic-input/input/input.component';
import { queryByLabelText } from '@testing-library/dom';
import { NameField } from '../field/name/name-field.component';
import { PatientRegistrationContext } from '../patient-registration-context';
import { GenderField } from '../field/gender/gender-field.component';
import { DobField } from '../field/dob/dob.component';

const mockFieldConfigs = {
  name: {
    displayMiddleName: true,
  },
};
describe('name input', () => {
  const testValidName = (givenNameValue: string, middleNameValue: string, familyNameValue: string) => {
    it(
      'does not display error message when givenNameValue: ' +
        givenNameValue +
        ', middleNameValue: ' +
        middleNameValue +
        ', familyNameValue: ' +
        familyNameValue,
      async () => {
        const error = await updateNameAndReturnError(givenNameValue, middleNameValue, familyNameValue);
        Object.values(error).map(currentError => expect(currentError).toBeNull());
      },
    );
  };

  const testInvalidName = (
    givenNameValue: string,
    middleNameValue: string,
    familyNameValue: string,
    expectedError: string,
    errorType: string,
  ) => {
    it(
      'displays error message when givenNameValue: ' +
        givenNameValue +
        ', middleNameValue: ' +
        middleNameValue +
        ', familyNameValue: ' +
        familyNameValue,
      async () => {
        const error = (await updateNameAndReturnError(givenNameValue, middleNameValue, familyNameValue))[errorType];
        expect(error.textContent).toEqual(expectedError);
      },
    );
  };

  const updateNameAndReturnError = async (givenNameValue: string, middleNameValue: string, familyNameValue: string) => {
    render(
      <Formik
        initialValues={{
          givenName: '',
          middleName: '',
          familyName: '',
        }}
        onSubmit={null}
        validationSchema={validationSchema}>
        <Form>
          <PatientRegistrationContext.Provider
            value={{
              identifierTypes: [],
              validationSchema,
              setValidationSchema: () => {},
              fieldConfigs: mockFieldConfigs,
              values: {},
              inEditMode: false,
              setFieldValue: () => null,
            }}>
            <NameField />
          </PatientRegistrationContext.Provider>
        </Form>
      </Formik>,
    );
    const givenNameInput = screen.getByLabelText('givenNameLabelText') as HTMLInputElement;
    const middleNameInput = screen.getByLabelText('middleNameLabelText') as HTMLInputElement;
    const familyNameInput = screen.getByLabelText('familyNameLabelText') as HTMLInputElement;

    fireEvent.change(givenNameInput, { target: { value: givenNameValue } });
    fireEvent.blur(givenNameInput);
    fireEvent.change(middleNameInput, { target: { value: middleNameValue } });
    fireEvent.blur(middleNameInput);
    fireEvent.change(familyNameInput, { target: { value: familyNameValue } });
    fireEvent.blur(familyNameInput);

    await wait();

    return {
      givenNameError: screen.queryByText('Given name is required'),
      middleNameError: screen.queryByText('Middle name is required'),
      familyNameError: screen.queryByText('Family name is required'),
    };
  };

  testValidName('Aaron', 'A', 'Aaronson');
  testValidName('No', '', 'Middle Name');
  testInvalidName('', '', '', 'Given name is required', 'givenNameError');
  testInvalidName('', '', '', 'Family name is required', 'familyNameError');
  testInvalidName('', 'No', 'Given Name', 'Given name is required', 'givenNameError');
  testInvalidName('No', 'Family Name', '', 'Family name is required', 'familyNameError');
});

describe.skip('birthdate input', () => {
  const testValidBirthdate = (validBirthdate: string) => {
    it('does not display error message when ' + validBirthdate + ' is inputted', async () => {
      const error = await updateBirthdateAndReturnError(validBirthdate);
      expect(error).toBeNull();
    });
  };

  const testInvalidBirthdate = (invalidBirthdate: string, expectedError: string) => {
    it('displays error message when ' + invalidBirthdate + ' is inputted', async () => {
      const error = await updateBirthdateAndReturnError(invalidBirthdate);
      expect(error.textContent).toEqual(expectedError);
    });
  };

  const updateBirthdateAndReturnError = async (birthdate: string) => {
    render(
      <Formik initialValues={{ birthdate: null }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <DobField />
        </Form>
      </Formik>,
    );
    const input = screen.getByLabelText('dateOfBirthLabelText') as HTMLInputElement;

    fireEvent.change(input, { target: { value: birthdate } });
    fireEvent.blur(input);

    await wait();

    return screen.getByText('Birthdate is required');
  };

  testValidBirthdate('09/10/1990');
  testValidBirthdate(
    dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  );
  testValidBirthdate(dayjs().format('YYYY-MM-DD'));
  testInvalidBirthdate(
    dayjs()
      .add(1, 'day')
      .format('YYYY-MM-DD'),
    'Birthdate cannot be in the future',
  );
  testInvalidBirthdate(null, 'Birthdate is required');
});

