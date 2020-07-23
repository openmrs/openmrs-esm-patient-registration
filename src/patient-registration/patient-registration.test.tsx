import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait, getByLabelText } from '@testing-library/react';
import dayjs from 'dayjs';
import { PatientRegistration } from './patient-registration.component';
import { debug } from 'webpack';
import { get } from 'https';

describe('patient registration', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
  });
});

describe('demographics section', () => {
  const updateName = (name: string) => {
    it('updates to correct ' + name, async () => {
      const { container } = render(<PatientRegistration />);
      const nameInput = container.querySelector('input[name="' + name + '"]') as HTMLInputElement;
      const expectedName = 'Joe';

      await wait(() => {
        fireEvent.change(nameInput, { target: { value: expectedName } });
      });

      expect(nameInput.value).toEqual(expectedName);
    });
  };

  updateName('givenName');
  updateName('middleName');
  updateName('familyName');

  it('updates to correct gender', async () => {
    const { container } = render(<PatientRegistration />);
    const genderSelect = container.querySelector('select[name="gender"]') as HTMLSelectElement;
    const expectedGender = 'M';

    await wait(() => {
      fireEvent.change(genderSelect, { target: { value: expectedGender } });
    });

    expect(genderSelect.value).toEqual(expectedGender);
  });

  it('update to correct birthdate', async () => {
    const { container } = render(<PatientRegistration />);
    const birthdateInput = container.querySelector('input[name="birthdate"]') as HTMLInputElement;
    const expectedDate = dayjs('2020-05-02', 'YYYY-MM-DD').toDate();

    await wait(() => {
      fireEvent.change(birthdateInput, { target: { valueAsDate: expectedDate } });
    });

    expect(birthdateInput.valueAsDate).toEqual(expectedDate);
  });
});

describe('contact info section', () => {
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

  const updateAddress = (name: string) => {
    it('updates to correct ' + name, async () => {
      const { container } = render(<PatientRegistration />);
      const addressInput = container.querySelector('input[name="' + name + '"]') as HTMLInputElement;
      const expectedAddress = 'Our House';

      await wait(() => {
        fireEvent.change(addressInput, { target: { value: expectedAddress } });
      });

      expect(addressInput.value).toEqual(expectedAddress);
    });
  };

  updateAddress('address1');
  updateAddress('address2');
  updateAddress('cityVillage');
  updateAddress('stateProvince');
  updateAddress('country');
  updateAddress('postalCode');
});
