import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PatientRegistration } from './patient-registration.component';

describe('name field', () => {
  const nameInputFieldSetup = (placeholderText: string) => {
    const utils = render(<PatientRegistration />);
    const textInput = utils.getByPlaceholderText(placeholderText) as HTMLInputElement;
    const name = 'Muller';
    return {
      textInput,
      name,
      ...utils,
    };
  };

  const updatesNameValue = (placeholderText: string) => {
    it('updates ' + placeholderText + ' name value', () => {
      const { textInput, name } = nameInputFieldSetup(placeholderText);
      fireEvent.change(textInput, { target: { value: name } });
      expect(textInput.value).toEqual(name);
    });
  };

  updatesNameValue('Given Name');
  updatesNameValue('Middle Name');
  updatesNameValue('Family Name');
  updatesNameValue('Additional Given Name');
  updatesNameValue('Additional Middle Name');
  updatesNameValue('Additional Family Name');

  it('updates unknown value', () => {
    const utils = render(<PatientRegistration />);
    const checkbox = utils.getByLabelText('unknown-checkbox') as HTMLInputElement;
    const unknownName = 'UNKNOWN';
    fireEvent.click(checkbox);
    expect(utils.getByPlaceholderText('Given Name').getAttribute('value')).toEqual(unknownName);
    expect(utils.getByPlaceholderText('Middle Name').getAttribute('value')).toEqual(unknownName);
    expect(utils.getByPlaceholderText('Family Name').getAttribute('value')).toEqual(unknownName);
  });
});

describe('gender field', () => {
  it('selects gender value', () => {
    const utils = render(<PatientRegistration />);
    const selectInput = utils.getByLabelText('gender-select') as HTMLSelectElement;
    const genderValue = 'F';
    fireEvent.change(selectInput, { target: { value: genderValue } });
    expect(selectInput.value).toEqual(genderValue);
  });
});
