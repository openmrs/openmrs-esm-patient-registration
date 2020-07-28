import React from 'react';
import { render, fireEvent, wait, screen, cleanup } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';
import { mockUniquePatientIdentifiers } from '../../__mocks__/uniquePatientIdentifiers.mock';
import { mockCurrentUserLocation } from '../../__mocks__/currentUserLocation.mock';
import { mockPersons } from '../../__mocks__/persons.mock';
import { mockRelationshipTypes } from '../../__mocks__/relationshipTypes.mock';
import {
  getAllRelationshipTypes,
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  getPerson,
} from './patient-registration.resource';

let wrapper: any;
const mockgetAllRelationshipTypes = getAllRelationshipTypes as jest.Mock;
const mockgetCurrentUserLocation = getCurrentUserLocation as jest.Mock;
const mockgetUniquePatientIdentifier = getUniquePatientIdentifier as jest.Mock;
const mockgetPerson = getPerson as jest.Mock;

jest.mock('./patient-registration.resource', () => ({
  getAllRelationshipTypes: jest.fn(),
  getCurrentUserLocation: jest.fn(),
  getUniquePatientIdentifier: jest.fn(),
  getPerson: jest.fn(),
}));

const mockPersonResult = mockPersons;
const mockRelationshipTypesResult = mockRelationshipTypes;
const mockCurrentUserLocationResult = mockCurrentUserLocation;
const mockUniquePatientIdentifierResult = mockUniquePatientIdentifiers;

describe('relationship section', () => {
  afterEach(cleanup);
  beforeEach(mockgetAllRelationshipTypes.mockReset);
  beforeEach(mockgetCurrentUserLocation.mockReset);
  beforeEach(mockgetUniquePatientIdentifier.mockReset);
  beforeEach(mockgetPerson.mockReset);

  function initMocks() {
    mockgetAllRelationshipTypes.mockReturnValue(Promise.resolve(mockRelationshipTypesResult));
    mockgetCurrentUserLocation.mockReturnValue(Promise.resolve(mockCurrentUserLocationResult));
    mockgetUniquePatientIdentifier.mockReturnValue(Promise.resolve(mockUniquePatientIdentifierResult));
    mockgetPerson.mockReturnValue(Promise.resolve(mockPersonResult));
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
