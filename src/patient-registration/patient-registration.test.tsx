import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import dayjs from 'dayjs';
import { PatientRegistration } from './patient-registration.component';

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
    const expectedGender = 'Male';

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
