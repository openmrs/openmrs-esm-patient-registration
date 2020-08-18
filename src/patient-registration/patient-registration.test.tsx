import React from 'react';
import ReactDOM from 'react-dom';
import { render, wait, cleanup } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';
import { useConfig } from '@openmrs/esm-module-config';
import { ConfigMock } from '../../__mocks__/openmrs-esm-config.mock';

const mockUseConfig = useConfig as jest.Mock;

jest.mock('@openmrs/esm-module-config', () => ({
  useConfig: jest.fn(),
}));

const mockUseConfigResult = ConfigMock;

function initMocks() {
  cleanup;
  mockUseConfig.mockReset;
  mockUseConfig.mockReturnValue(mockUseConfigResult);
}
describe('patient registration', () => {
  it('renders without crashing', () => {
    initMocks();
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
  });
});

describe('patient registration sections', () => {
  const testSectionExists = (labelText: string) => {
    it(labelText + ' exists', async () => {
      initMocks();
      const { getByLabelText } = render(<PatientRegistration />);
      await wait();
      expect(getByLabelText(labelText)).not.toBeNull();
    });
  };

  testSectionExists('Demographics Section');
  testSectionExists('Contact Info Section');
  testSectionExists('Person Attribute Section');
});
