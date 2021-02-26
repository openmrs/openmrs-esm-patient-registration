import React from 'react';
import ReactDOM from 'react-dom';
import { render, wait, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as backendController from './patient-registration.resource';
import * as mockOpenmrsFramework from '../../__mocks__/openmrs-esm-framework.mock';
import { PatientRegistration } from './patient-registration.component';
import { getAddressTemplateMock } from '../../__mocks__/openmrs-esm-framework.mock';
import { mockPatient } from '../../__mocks__/patient.mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'openmrs/spa/patient-registration',
  }),
}));

let mockOpenmrsConfig = {
  sections: ['demographics', 'contact'],
  sectionDefinitions: {
    demographics: {
      name: 'Demographics',
      fields: ['name', 'gender', 'dob'],
    },
    contact: {
      name: 'Contact Info',
      fields: ['address'],
    },
    relationships: {
      name: 'Relationships',
      fields: ['relationship'],
    },
  },
  fieldConfigurations: {
    name: {
      displayMiddleName: true,
    },
  },
  concepts: {
    patientPhotoUuid: '736e8771-e501-4615-bfa7-570c03f4bef5',
  },
};

describe('patient registration', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
  });
});

describe('patient registration sections', () => {
  const testSectionExists = (labelText: string) => {
    it(labelText + ' exists', async () => {
      render(<PatientRegistration />);
      await wait();
      expect(screen.getByLabelText(labelText)).not.toBeNull();
    });
  };

  beforeAll(() => {
    spyOn(mockOpenmrsFramework, 'useConfig').and.returnValue(mockOpenmrsConfig);
  });

  testSectionExists('Demographics Section');
  testSectionExists('Contact Info Section');
});

describe('form submit', () => {
  const fillRequiredFields = async getByLabelText => {
    const givenNameInput = getByLabelText('givenNameLabelText') as HTMLInputElement;
    const familyNameInput = getByLabelText('familyNameLabelText') as HTMLInputElement;
    const dateOfBirthInput = getByLabelText('dateOfBirthLabelText') as HTMLInputElement;
    const genderInput = getByLabelText('Male') as HTMLSelectElement;

    userEvent.type(givenNameInput, 'Paul');
    userEvent.type(familyNameInput, 'Gaihre');
    userEvent.type(dateOfBirthInput, '1993-08-02');
    fireEvent.click(genderInput);

    await wait();
  };

  beforeAll(() => {
    spyOn(backendController, 'getAddressTemplate').and.returnValue(getAddressTemplateMock());
    spyOn(mockOpenmrsFramework, 'useConfig').and.returnValue(mockOpenmrsConfig);
  });

  it('saves the patient without extra info', async () => {
    spyOn(backendController, 'savePatient').and.returnValue(Promise.resolve({}));

    render(<PatientRegistration />);
    await wait();

    await fillRequiredFields(screen.getByLabelText);

    userEvent.click(screen.getByText('registerPatient'));
    await wait();

    expect(backendController.savePatient).toHaveBeenCalledWith(
      expect.anything(),
      {
        identifiers: [], //TODO when the identifer story is finished: { identifier: '', identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334', location: '' }
        // identifiers: [{ identifier: '', identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334', location: '' }],
        person: {
          addresses: [{ address1: '', address2: '', cityVillage: '', country: '', postalCode: '', stateProvince: '' }],
          attributes: [],
          birthdate: '1993-08-02',
          birthdateEstimated: false,
          gender: 'M',
          names: [{ givenName: 'Paul', middleName: '', familyName: 'Gaihre', preferred: true }],
          dead: false,
        },
      },
      undefined,
    );
  });

  it('should not save the patient if validation fails', async () => {
    spyOn(backendController, 'savePatient').and.returnValue(Promise.resolve({}));
    render(<PatientRegistration />);
    await wait();

    const givenNameInput = screen.getByLabelText('givenNameLabelText') as HTMLInputElement;

    userEvent.type(givenNameInput, '');
    await wait();

    userEvent.click(screen.getByText('registerPatient'));
    await wait();

    expect(backendController.savePatient).not.toHaveBeenCalled();
  });

  it('edits patient demographics', async () => {
    spyOn(backendController, 'savePatient').and.returnValue(Promise.resolve({}));
    spyOn(backendController, 'getIdentifierSources').and.returnValue(
      Promise.resolve({
        data: {
          results: [],
        },
      }),
    );
    spyOn(backendController, 'getAutoGenerationOptions').and.returnValue(
      Promise.resolve({
        data: {
          results: [],
        },
      }),
    );
    spyOn(backendController, 'getPrimaryIdentifierType').and.returnValue(
      Promise.resolve({
        name: 'OpenMRS Id',
        fieldName: 'openMrsId',
        required: true,
        isPrimary: true,
        uuid: 'e5af9a9c-ff9d-486d-900c-5fbf66a5ba3c',
      }),
    );
    spyOn(backendController, 'getSecondaryIdentifierTypes').and.returnValue(
      Promise.resolve([
        {
          name: 'Old Identification Number',
          fieldName: 'oldIdentificationNumber',
          required: false,
          isPrimary: false,
          uuid: '3ff0063c-dd45-4d98-8af4-0c094f26166c',
        },
      ]),
    );

    spyOn(mockOpenmrsFramework, 'useCurrentPatient').and.returnValue([false, mockPatient, mockPatient.id, null]);
    render(<PatientRegistration />);
    await wait();

    const givenNameInput = screen.getByLabelText('givenNameLabelText') as HTMLInputElement;
    const familyNameInput = screen.getByLabelText('familyNameLabelText') as HTMLInputElement;
    const middleNameInput = screen.getByLabelText('middleNameLabelText') as HTMLInputElement;
    const dateOfBirthInput = screen.getByLabelText('dateOfBirthLabelText') as HTMLInputElement;
    const address1 = screen.getByLabelText('Location.address1') as HTMLInputElement;

    // assert initial values
    expect(givenNameInput.value).toBe('John');
    expect(familyNameInput.value).toBe('Wilson');
    expect(middleNameInput.value).toBeFalsy();
    expect(dateOfBirthInput.value).toBe('4/4/1972');

    // do some edits
    userEvent.clear(givenNameInput);
    userEvent.clear(middleNameInput);
    userEvent.clear(familyNameInput);
    userEvent.type(givenNameInput, 'Eric');
    userEvent.type(middleNameInput, 'Johnson');
    userEvent.type(familyNameInput, 'Smith');
    userEvent.type(address1, 'Bom Jesus Street');
    userEvent.click(screen.getByText('updatePatient'));
    await wait();

    expect(backendController.savePatient).toHaveBeenCalledWith(
      expect.anything(),
      {
        uuid: '8673ee4f-e2ab-4077-ba55-4980f408773e',
        identifiers: [
          {
            uuid: '1f0ad7a1-430f-4397-b571-59ea654a52db',
            identifier: '100GEJ',
            identifierType: 'e5af9a9c-ff9d-486d-900c-5fbf66a5ba3c',
            location: '',
            preferred: true,
          },
          {
            uuid: '1f0ad7a1-430f-4397-b571-59ea654a52db',
            identifier: '100732HE',
            identifierType: '3ff0063c-dd45-4d98-8af4-0c094f26166c',
            location: '',
            preferred: false,
          },
        ],
        person: {
          addresses: [
            {
              address1: 'Bom Jesus Street',
              address2: '',
              cityVillage: 'City0351',
              country: 'Country0351',
              postalCode: '60351',
              stateProvince: 'State0351tested',
            },
          ],
          attributes: [],
          birthdate: new Date('1972-04-04'),
          birthdateEstimated: false,
          gender: 'M',
          names: [
            {
              uuid: 'efdb246f-4142-4c12-a27a-9be60b9592e9',
              givenName: 'Eric',
              middleName: 'Johnson',
              familyName: 'Smith',
              preferred: true,
            },
          ],
          dead: false,
          uuid: '8673ee4f-e2ab-4077-ba55-4980f408773e',
        },
      },
      '8673ee4f-e2ab-4077-ba55-4980f408773e',
    );
  });
});
