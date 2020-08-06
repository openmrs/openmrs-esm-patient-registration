import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { validationSchema } from './patient-registration-validation';
import { NameInput } from '../input/custom-input/name/name-input.component';
import { SelectInput } from '../input/basic-input/select/select-input.component';
import { DateInput } from '../input/basic-input/date/date-input.component';
import { TelephoneNumberInput } from '../input/basic-input/telephone-number/telephone-number-input.component';
import { EstimatedAgeInput } from '../input/custom-input/estimated-age/estimated-age-input.component';

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
    const { container, getByLabelText } = render(
      <Formik
        initialValues={{
          givenName: '',
          middleName: '',
          familyName: '',
        }}
        onSubmit={null}
        validationSchema={validationSchema}>
        <Form>
          <NameInput givenName="givenName" middleName="middleName" familyName="familyName" />
        </Form>
      </Formik>,
    );
    const givenNameInput = getByLabelText('Given Name') as HTMLInputElement;
    const middleNameInput = getByLabelText('Middle Name') as HTMLInputElement;
    const familyNameInput = getByLabelText('Family Name') as HTMLInputElement;

    fireEvent.change(givenNameInput, { target: { value: givenNameValue } });
    fireEvent.blur(givenNameInput);
    fireEvent.change(middleNameInput, { target: { value: middleNameValue } });
    fireEvent.blur(middleNameInput);
    fireEvent.change(familyNameInput, { target: { value: familyNameValue } });
    fireEvent.blur(familyNameInput);

    await wait();

    return {
      givenNameError: container.querySelector('div[aria-label="givenNameError"]'),
      middleNameError: container.querySelector('div[aria-label="middleNameError"]'),
      familyNameError: container.querySelector('div[aria-label="familyNameError"]'),
    };
  };

  testValidName('Aaron', 'A', 'Aaronson');
  testValidName('No', '', 'Middle Name');
  testInvalidName('', '', '', 'Given name is required', 'givenNameError');
  testInvalidName('', '', '', 'Family name is required', 'familyNameError');
  testInvalidName('', 'No', 'Given Name', 'Given name is required', 'givenNameError');
  testInvalidName('No', 'Family Name', '', 'Family name is required', 'familyNameError');
});

describe('gender input', () => {
  const testValidGender = (validGender: string) => {
    it('does not display error message when ' + validGender + ' is inputted', async () => {
      const error = await updateGenderAndReturnError(validGender);
      expect(error).toBeNull();
    });
  };

  const testInvalidGender = (invalidGender: string, expectedError: string) => {
    it('displays error message when ' + invalidGender + ' is inputted', async () => {
      const error = await updateGenderAndReturnError(invalidGender);
      expect(error.textContent).toEqual(expectedError);
    });
  };

  const updateGenderAndReturnError = async (gender: string) => {
    const { container, getByLabelText } = render(
      <Formik initialValues={{ gender: '' }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <SelectInput name="gender" options={['Male', 'Female', 'Other', 'Unknown']} />
        </Form>
      </Formik>,
    );
    const input = getByLabelText('gender') as HTMLSelectElement;

    fireEvent.change(input, { target: { value: gender } });
    fireEvent.blur(input);

    await wait();

    return container.querySelector('div[aria-label="genderError"]');
  };

  testValidGender('Male');
  testValidGender('Female');
  testValidGender('Other');
  testValidGender('Unknown');
  testInvalidGender('', 'Gender is required');
});

describe('birthdate input', () => {
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
    const { container, getByLabelText } = render(
      <Formik initialValues={{ birthdate: null }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <DateInput name="birthdate" />
        </Form>
      </Formik>,
    );
    const input = getByLabelText('birthdate') as HTMLInputElement;

    fireEvent.change(input, { target: { value: birthdate } });
    fireEvent.blur(input);

    await wait();

    return container.querySelector('div[aria-label="birthdateError"]');
  };

  testValidBirthdate('1990-09-10');
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

describe('estimated age input', () => {
  const testValidEstimatedAge = (validEstimatedAge: { years: number; months: number }) => {
    it('does not display error message when ' + validEstimatedAge + ' is inputted', async () => {
      const error = await updateEstimatedAgeAndReturnError(validEstimatedAge);
      expect(error.yearsEstimatedError).toBeNull();
      expect(error.monthsEstimatedError).toBeNull();
    });
  };

  const testInvalidEstimatedYears = (invalidEstimatedAge: { years: number; months: number }, expectedError: string) => {
    it('displays error message when ' + invalidEstimatedAge + ' is inputted', async () => {
      const error = await updateEstimatedAgeAndReturnError(invalidEstimatedAge);
      expect(error.yearsEstimatedError.textContent).toEqual(expectedError);
    });
  };

  const testInvalidEstimatedMonths = (
    invalidEstimatedAge: { years: number; months: number },
    expectedError: string,
  ) => {
    it('displays error message when ' + invalidEstimatedAge + ' is inputted', async () => {
      const error = await updateEstimatedAgeAndReturnError(invalidEstimatedAge);
      expect(error.monthsEstimatedError.textContent).toEqual(expectedError);
    });
  };

  const updateEstimatedAgeAndReturnError = async (estimatedAge: { years: number; months: number }) => {
    const { container, getByLabelText } = render(
      <Formik
        initialValues={{ yearsEstimated: 0, monthsEstimated: 0 }}
        onSubmit={null}
        validationSchema={validationSchema}>
        <Form>
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" setBirthdate={() => {}} />
        </Form>
      </Formik>,
    );
    const yearsEstimatedInput = getByLabelText('Years') as HTMLInputElement;
    const monthsEstimatedInput = getByLabelText('Months') as HTMLInputElement;

    fireEvent.change(yearsEstimatedInput, { target: { value: estimatedAge.years } });
    fireEvent.blur(yearsEstimatedInput);
    fireEvent.change(monthsEstimatedInput, { target: { value: estimatedAge.months } });
    fireEvent.blur(monthsEstimatedInput);

    await wait();

    return {
      yearsEstimatedError: container.querySelector('div[aria-label="yearsEstimatedError"]'),
      monthsEstimatedError: container.querySelector('div[aria-label="monthsEstimatedError"]'),
    };
  };

  testValidEstimatedAge({
    years: 30,
    months: 1,
  });
  testInvalidEstimatedYears(
    {
      years: -10,
      months: 2,
    },
    'Years cannot be less than 0',
  );
  testInvalidEstimatedMonths(
    {
      years: 20,
      months: -10,
    },
    'Months cannot be less than 0',
  );
});

describe('telephone number input', () => {
  const testValidTelephoneNumber = (validNumber: string) => {
    it('does not display error message when ' + validNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(validNumber);
      expect(error).toBeNull();
    });
  };

  const testInvalidTelephoneNumber = (invalidNumber: string) => {
    it('displays error message when ' + invalidNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(invalidNumber);
      expect(error.textContent).toEqual('Telephone number should only contain digits');
    });
  };

  const updateTelephoneNumberAndReturnError = async (number: string) => {
    const { container, getByLabelText } = render(
      <Formik initialValues={{ telephoneNumber: '' }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <TelephoneNumberInput label="telephoneNumber" placeholder="Enter telephone number" name="telephoneNumber" />
        </Form>
      </Formik>,
    );
    const input = getByLabelText('telephoneNumber') as HTMLInputElement;

    fireEvent.change(input, { target: { value: number } });
    fireEvent.blur(input);

    await wait();

    return container.querySelector('div[aria-label="telephoneNumberError"]');
  };

  testValidTelephoneNumber('0800001066');
  testInvalidTelephoneNumber('not a phone number');
  testInvalidTelephoneNumber('+0800001066');
  testInvalidTelephoneNumber('(0800)001066');
});
