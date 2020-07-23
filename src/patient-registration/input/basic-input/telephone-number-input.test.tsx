import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait, getByLabelText } from '@testing-library/react';
import { PatientRegistration } from '../../patient-registration.component';

describe('telephone number input', () => {
  it('exists', async () => {
    const { getByLabelText } = render(<PatientRegistration />);
    const input = getByLabelText('telephoneNumber') as HTMLInputElement;
    await wait();
    expect(input.type).toEqual('tel');
  });

  it('can input data', async () => {
    const expected = '0800001066';
    const actual = (await updateTelephoneNumber(expected)).inputField.value;
    expect(actual).toEqual(expected);
  });

  const testValidPhoneNumber = (validNumber: string) => {
    it('does not display error message when ' + validNumber + ' is inputted', async () => {
      const error = (await updateTelephoneNumber(validNumber)).error;
      expect(error).toBeNull();
    });
  };

  const testInvalidPhoneNumber = (invalidNumber: string) => {
    it('displays error message when ' + invalidNumber + ' is inputted', async () => {
      const error = (await updateTelephoneNumber(invalidNumber)).error;
      expect(error.textContent).toEqual('Telephone number should only contain digits');
    });
  };

  testValidPhoneNumber('0800001066');
  testInvalidPhoneNumber('not a phone number');
  testInvalidPhoneNumber('+0800001066');
  testInvalidPhoneNumber('(0800)001066');

  const updateTelephoneNumber = async (number: string) => {
    const { container, getByLabelText } = render(<PatientRegistration />);
    const input = getByLabelText('telephoneNumber') as HTMLInputElement;

    fireEvent.change(input, { target: { value: number } });
    fireEvent.blur(input);

    await wait();

    return {
      inputField: input,
      error: container.querySelector('div[aria-label="telephoneNumberError"]'),
    };
  };
});