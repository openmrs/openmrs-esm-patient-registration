import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait, getByLabelText } from '@testing-library/react';
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

describe('contact person section', () => {
  beforeAll(() => {
    localStorage.setItem('patient-registration:contact-person', 'true');
  });

  it('renders contact person section', async () => {
    let contactPersonSection: HTMLElement[];

    await wait(() => {
      const { getAllByLabelText } = render(<PatientRegistration />);
      contactPersonSection = getAllByLabelText('contactPersonSection');
    });

    expect(contactPersonSection).toHaveLength(1);
  });

  const checkNameExists = (name: string) => {
    it('has a ' + name + ' field', async () => {
      const { container } = render(<PatientRegistration />);
      let contactPersonInput: HTMLInputElement;

      await wait(() => {
        contactPersonInput = container.querySelector('input[name="' + name + '"]') as HTMLInputElement;
      });

      expect(contactPersonInput).toBeTruthy();
    });
  };

  checkNameExists('contactPersonGivenName');
  checkNameExists('contactPersonMiddleName');
  checkNameExists('contactPersonFamilyName');

  const updateName = (name: string) => {
    it('updates ' + name + ' to correct name', async () => {
      const { container } = render(<PatientRegistration />);
      const contactPersonInput = container.querySelector('input[name="' + name + '"]') as HTMLInputElement;
      const expectedValue = 'Paul';

      await wait(() => {
        fireEvent.change(contactPersonInput, { target: { value: expectedValue } });
      });

      expect(contactPersonInput.value).toEqual(expectedValue);
    });
  };

  updateName('contactPersonGivenName');
  updateName('contactPersonMiddleName');
  updateName('contactPersonFamilyName');

  it('check contact person phone field exist', async () => {
    const { container } = render(<PatientRegistration />);
    let contactPersonTelephoneNumberInput: HTMLInputElement;

    await wait(() => {
      contactPersonTelephoneNumberInput = container.querySelector(
        'input[name="contactPersonTelephoneNumber"]',
      ) as HTMLInputElement;
    });
    expect(contactPersonTelephoneNumberInput).toBeTruthy();
  });

  it('updates phone to correct phone', async () => {
    const { container } = render(<PatientRegistration />);
    const contactPersonTelephoneNumberInput = container.querySelector(
      'input[name="contactPersonTelephoneNumber"]',
    ) as HTMLInputElement;
    const expectedValue = '9343949';

    await wait(() => {
      fireEvent.change(contactPersonTelephoneNumberInput, { target: { value: expectedValue } });
    });

    expect(contactPersonTelephoneNumberInput.value).toEqual(expectedValue);
  });

  it('check contact person relationship field exist', async () => {
    const { container } = render(<PatientRegistration />);
    let contactPersonRelationshipInput: HTMLInputElement;

    await wait(() => {
      contactPersonRelationshipInput = container.querySelector(
        'select[name="contactPersonRelationship"]',
      ) as HTMLInputElement;
    });
    expect(contactPersonRelationshipInput).toBeTruthy();
  });

  it('updates to correct relationship', async () => {
    const { container } = render(<PatientRegistration />);
    const relationshipSelect = container.querySelector('select[name="contactPersonRelationship"]') as HTMLSelectElement;
    const expectedRelationship = 'Sibling';

    await wait(() => {
      fireEvent.change(relationshipSelect, { target: { value: expectedRelationship } });
    });

    expect(relationshipSelect.value).toEqual(expectedRelationship);
  });
});
