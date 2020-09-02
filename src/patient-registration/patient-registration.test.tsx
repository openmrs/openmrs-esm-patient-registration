import React from 'react';
import ReactDOM from 'react-dom';
import { render, wait, fireEvent } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';
import * as backendController from './patient-registration.resource';

describe('patient registration', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
  });
});

describe('patient registration sections', () => {
  const testSectionExists = (labelText: string) => {
    it(labelText + ' exists', async () => {
      const { getByLabelText } = render(<PatientRegistration />);
      await wait();
      expect(getByLabelText(labelText)).not.toBeNull();
    });
  };

  testSectionExists('Demographics Section');
  testSectionExists('Contact Info Section');
});

describe('form submit', () => {
  it('saves the patient', async () => {
    spyOn(backendController, 'savePatient').and.callThrough();

    const { getByText, getByLabelText } = render(<PatientRegistration />);
    await wait();

    const givenNameInput = getByLabelText('givenName') as HTMLInputElement;
    const familyNameInput = getByLabelText('familyName') as HTMLInputElement;
    const dateOfBirthInput = getByLabelText('birthdate') as HTMLInputElement;
    const genderSelect = getByLabelText('gender') as HTMLSelectElement;

    fireEvent.change(givenNameInput, { target: { value: 'Paul' } });
    fireEvent.blur(givenNameInput);
    fireEvent.change(familyNameInput, { target: { value: 'Gaihre' } });
    fireEvent.blur(familyNameInput);
    fireEvent.change(dateOfBirthInput, { target: { value: '1993-08-02' } });
    fireEvent.blur(dateOfBirthInput);
    fireEvent.change(genderSelect, { target: { value: 'Male' } });
    fireEvent.blur(genderSelect);
    await wait();

    fireEvent.click(getByText('Register Patient'));
    await wait();

    expect(backendController.savePatient).toHaveBeenCalledWith(expect.anything(), {
      identifiers: [{ identifier: '', identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334', location: '' }],
      person: {
        addresses: [{ address1: '', address2: '', cityVillage: '', country: '', postalCode: '', stateProvince: '' }],
        attributes: [{ attributeType: '14d4f066-15f5-102d-96e4-000c29c2a5d7', value: '' }],
        birthdate: '1993-08-02',
        birthdateEstimated: false,
        gender: 'M',
        names: [{ givenName: 'Paul', middleName: '', familyName: 'Gaihre', preferred: true }],
      },
    });
  });

  it('should not save the patient if validation fails', async () => {
    spyOn(backendController, 'savePatient');
    const { getByText, getByLabelText } = render(<PatientRegistration />);
    await wait();

    const givenNameInput = getByLabelText('givenName') as HTMLInputElement;

    fireEvent.change(givenNameInput, { target: { value: '' } });
    fireEvent.blur(givenNameInput);
    await wait();

    fireEvent.click(getByText('Register Patient'));
    await wait();

    expect(backendController.savePatient).not.toHaveBeenCalled();
  });
});
