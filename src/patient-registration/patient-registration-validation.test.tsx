import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { validationSchema } from './patient-registration-validation';
import { TelephoneNumberInput } from './input/basic-input/telephone-number-input/telephone-number-input.component';

describe('telephone number input', () => {
  const testValidPhoneNumber = (validNumber: string) => {
    it('does not display error message when ' + validNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(validNumber);
      expect(error).toBeNull();
    });
  };

  const testInvalidPhoneNumber = (invalidNumber: string) => {
    it('displays error message when ' + invalidNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(invalidNumber);
      expect(error.textContent).toEqual('Telephone number should only contain digits');
    });
  };

  const updateTelephoneNumberAndReturnError = async (number: string) => {
    const { container, getByLabelText } = render(
      <Formik initialValues={{ telephoneNumber: '' }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <TelephoneNumberInput label="" placeholder="Enter telephone number" name="telephoneNumber" />
        </Form>
      </Formik>,
    );
    const input = getByLabelText('telephoneNumber') as HTMLInputElement;

    fireEvent.change(input, { target: { value: number } });
    fireEvent.blur(input);

    await wait();

    return container.querySelector('div[aria-label="telephoneNumberError"]');
  };

  testValidPhoneNumber('0800001066');
  testInvalidPhoneNumber('not a phone number');
  testInvalidPhoneNumber('+0800001066');
  testInvalidPhoneNumber('(0800)001066');
});

describe('contact person telephone number input', () => {
  const testValidPhoneNumber = (validNumber: string) => {
    it('does not display error message when ' + validNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(validNumber);
      expect(error).toBeNull();
    });
  };

  const testInvalidPhoneNumber = (invalidNumber: string) => {
    it('displays error message when ' + invalidNumber + ' is inputted', async () => {
      const error = await updateTelephoneNumberAndReturnError(invalidNumber);
      expect(error.textContent).toEqual('Telephone number should only contain digits');
    });
  };

  const updateTelephoneNumberAndReturnError = async (number: string) => {
    const { container, getByLabelText } = render(
      <Formik initialValues={{ contactPersonTelephoneNumber: '' }} onSubmit={null} validationSchema={validationSchema}>
        <Form>
          <TelephoneNumberInput label="" placeholder="Enter telephone number" name="contactPersonTelephoneNumber" />
        </Form>
      </Formik>,
    );
    const input = getByLabelText('contactPersonTelephoneNumber') as HTMLInputElement;

    fireEvent.change(input, { target: { value: number } });
    fireEvent.blur(input);

    await wait();

    return container.querySelector('div[aria-label="contactPersonTelephoneNumberError"]');
  };

  testValidPhoneNumber('0800001066');
  testInvalidPhoneNumber('not a phone number');
  testInvalidPhoneNumber('+0800001066');
  testInvalidPhoneNumber('(0800)001066');
});
