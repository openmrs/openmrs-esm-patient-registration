import React from 'react';
import ReactDOM from 'react-dom';
import { render, wait } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';

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

  testSectionExists('demographics section');
  testSectionExists('contact info section');
});
