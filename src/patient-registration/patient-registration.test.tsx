import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';

describe('name field', () => {
  const setup = (placeholderText: string) => {
    const utils = render(<PatientRegistration />);
    const input = utils.getByPlaceholderText(placeholderText);
    const name = 'Muller';
    return {
      input,
      name,
      ...utils,
    };
  };

  const updatesNameValue = (placeholderText: string) => {
    it('updates ' + placeholderText + ' name value', () => {
      const { input, name } = setup(placeholderText);
      fireEvent.change(input, { target: { value: name } });
      expect(input.getAttribute('value')).toEqual(name);
    });
  };

  updatesNameValue('Given Name');
  updatesNameValue('Middle Name');
  updatesNameValue('Family Name');
  updatesNameValue('Additional Given Name');
  updatesNameValue('Additional Middle Name');
  updatesNameValue('Additional Family Name');
});
