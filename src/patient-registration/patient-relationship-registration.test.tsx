import React from 'react';
import { render, fireEvent, wait, screen, cleanup } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';
import { mockUniquePatientIdentifiers } from '../../__mocks__/uniquePatientIdentifiers.mock';
import { mockCurrentUserLocation } from '../../__mocks__/currentUserLocation.mock';
import { mockPersons } from '../../__mocks__/persons.mock';
import { mockRelationshipTypes } from '../../__mocks__/relationshipTypes.mock';
import { mockAddressTemplate } from '../../__mocks__/addressTemplate.mock';

import {
  getAllRelationshipTypes,
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  searchPerson,
  getAddressTemplate,
  getPrimaryIdentifierType,
  getSecondaryIdentifierTypes,
} from './patient-registration.resource';
import { useLocation } from 'react-router-dom';

let wrapper: any;

const mockgetAllRelationshipTypes = getAllRelationshipTypes as jest.Mock;
const mockgetCurrentUserLocation = getCurrentUserLocation as jest.Mock;
const mockgetUniquePatientIdentifier = getUniquePatientIdentifier as jest.Mock;
const searchPersonMock = searchPerson as jest.Mock;
const useLocationMock = useLocation as jest.Mock;
const getAddressTemplateMock = getAddressTemplate as jest.Mock;
const getPrimaryIdentifierTypeMock = getPrimaryIdentifierType as jest.Mock;
const getSecondaryIdentifierTypesMock = getSecondaryIdentifierTypes as jest.Mock;

jest.mock('./patient-registration.resource', () => ({
  getAllRelationshipTypes: jest.fn(),
  getCurrentUserLocation: jest.fn(),
  getUniquePatientIdentifier: jest.fn(),
  searchPerson: jest.fn(),
  getAddressTemplate: jest.fn(),
  getPrimaryIdentifierType: jest.fn(),
  getSecondaryIdentifierTypes: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('relationship section', () => {
  afterEach(cleanup);
  beforeEach(mockgetAllRelationshipTypes.mockReset);
  beforeEach(mockgetCurrentUserLocation.mockReset);
  beforeEach(mockgetUniquePatientIdentifier.mockReset);
  beforeEach(searchPersonMock.mockReset);
  beforeEach(useLocationMock.mockReset);
  beforeEach(getAddressTemplateMock.mockReset);
  beforeEach(getPrimaryIdentifierTypeMock.mockReset);
  beforeEach(getSecondaryIdentifierTypesMock.mockReset);

  function initMocks() {
    mockgetAllRelationshipTypes.mockReturnValue(Promise.resolve(mockRelationshipTypes));
    mockgetCurrentUserLocation.mockReturnValue(Promise.resolve(mockCurrentUserLocation));
    mockgetUniquePatientIdentifier.mockReturnValue(Promise.resolve(mockUniquePatientIdentifiers));
    searchPersonMock.mockReturnValue(Promise.resolve(mockPersons));
    useLocationMock.mockReturnValue({ search: 'q=search-string' });
    getAddressTemplateMock.mockReturnValue(Promise.resolve(mockAddressTemplate));
    getPrimaryIdentifierTypeMock.mockReturnValue(Promise.resolve());
    getSecondaryIdentifierTypesMock.mockReturnValue(Promise.resolve([]));
  }

  it('updates to correct relationship name', async () => {
    initMocks();
    wrapper = render(<PatientRegistration />);
    const personNameInput = screen.getByPlaceholderText('Person name') as HTMLInputElement;

    const expectedRelationships = [
      { uuid: '768-987', name: 'odora hill', type: '8d919b58-c2cc-11de-8d13-0010c6dffd0f-A' },
    ];

    await wait(() => {
      fireEvent.change(personNameInput, { target: { value: expectedRelationships[0].name } });
    });
    expect(personNameInput.value).toEqual(expectedRelationships[0].name);
  });

  it('updates to correct relationship type', async () => {
    initMocks();
    wrapper = render(<PatientRegistration />);
    const relationshipTypeSelect = screen.getByTestId('relationship-type-select') as HTMLSelectElement;
    const expectedRelationships = [
      { uuid: '768-987', name: 'odora hill', type: '8d919b58-c2cc-11de-8d13-0010c6dffd0f-A' },
    ];

    await wait(() => {
      fireEvent.change(relationshipTypeSelect, { target: { value: expectedRelationships[0].type } });
    });

    expect(relationshipTypeSelect.value).toEqual(expectedRelationships[0].type);
  });
});
