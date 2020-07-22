import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait, getByLabelText } from '@testing-library/react';
import dayjs from 'dayjs';
import { PatientRegistration } from './patient-registration.component';
import { debug } from 'webpack';

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
  it('contains input for telephone number', async () => {
    const { container } = render(<PatientRegistration />);
    const telephoneNumberInput = container.querySelector('input[name="telephoneNumber"]') as HTMLInputElement;
    await wait();
    expect(telephoneNumberInput.type).toEqual('tel');
  });

  it('inputs data into the telephone number field', async () => {
    const expectedTelephoneNumber = '0800001066';
    const actualTelephoneNumber = (await updateTelephoneNumber(expectedTelephoneNumber)).inputField.value;
    expect(actualTelephoneNumber).toEqual(expectedTelephoneNumber);
  });

  it('does not display error when valid telephone number is inputted', async () => {
    const validTelephoneNumber = '0800001066';
    const telephoneNumberError = (await updateTelephoneNumber(validTelephoneNumber)).error;
    expect(telephoneNumberError).toBeNull();
  });

  it('displays error when invalid telephone number is inputted', async () => {
    const invalidTelephoneNumber = '+0800001066';
    const telephoneNumberError = (await updateTelephoneNumber(invalidTelephoneNumber)).error;
    expect(telephoneNumberError.textContent).toEqual('Telephone number should only contain digits');
  });

  const updateTelephoneNumber = async (telephonNumber: string) => {
    const { container } = render(<PatientRegistration />);
    const telephoneNumberInput = container.querySelector('input[name="telephoneNumber"]') as HTMLInputElement;

    fireEvent.change(telephoneNumberInput, { target: { value: telephonNumber } });
    fireEvent.blur(telephoneNumberInput);

    await wait();

    return {
      inputField: telephoneNumberInput,
      error: container.querySelector('div[aria-label="telephoneNumberError"]')
    };
  };




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
