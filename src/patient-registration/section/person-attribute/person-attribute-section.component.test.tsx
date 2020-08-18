import { render, fireEvent, wait, screen, cleanup } from '@testing-library/react';
import { useConfig } from '@openmrs/esm-module-config';
import { ConfigMock } from '../../../../__mocks__/openmrs-esm-config.mock';
//import { ConfigMock } from '../../../../__mocks__/openmrs-esm-module-config.mock';
import { mockCurrentUserLocation } from '../../../../__mocks__/currentUserLocation.mock';
import { mockUniquePatientIdentifiers } from '../../../../__mocks__/uniquePatientIdentifiers.mock';
import { getCurrentUserLocation, getUniquePatientIdentifier } from '../../patient-registration.resource';
import { PatientRegistration } from '../../patient-registration.component';
import React from 'react';

let wrapper: any;
const mockUseConfig = useConfig as jest.Mock;
const mockgetCurrentUserLocation = getCurrentUserLocation as jest.Mock;
const mockgetUniquePatientIdentifier = getUniquePatientIdentifier as jest.Mock;

jest.mock('@openmrs/esm-module-config', () => ({
  useConfig: jest.fn(),
}));

jest.mock('./../../patient-registration.resource', () => ({
  getCurrentUserLocation: jest.fn(),
  getUniquePatientIdentifier: jest.fn(),
}));

const mockUseConfigResult = ConfigMock;
const mockCurrentUserLocationResult = mockCurrentUserLocation;
const mockUniquePatientIdentifierResult = mockUniquePatientIdentifiers;

describe('person attribute section', () => {
  afterEach(cleanup);
  beforeEach(mockUseConfig.mockReset);
  beforeEach(mockgetCurrentUserLocation.mockReset);
  beforeEach(mockgetUniquePatientIdentifier.mockReset);

  function initMocks() {
    mockgetCurrentUserLocation.mockReturnValue(Promise.resolve(mockCurrentUserLocationResult));
    mockgetUniquePatientIdentifier.mockReturnValue(Promise.resolve(mockUniquePatientIdentifierResult));
    mockUseConfig.mockReturnValue(mockUseConfigResult);
  }
  it('updates to correct telephone number', async () => {
    initMocks();
    wrapper = render(<PatientRegistration />);
    const telephoneNumberInput = screen.getByPlaceholderText('Enter Telephone Number') as HTMLInputElement;

    const expected = [{ attributeType: '7867kjh', value: '' }];

    await wait(() => {
      fireEvent.change(telephoneNumberInput, { target: { value: expected[0].value } });
    });
    expect(telephoneNumberInput.value).toEqual(expected[0].value);
  });
});
