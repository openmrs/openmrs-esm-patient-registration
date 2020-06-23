import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';
import { PatientRegistration } from './patient-registration.component';

const setup = (labelText: string) => {
  const utils = render(<PatientRegistration />);
  const input = utils.getByLabelText(labelText) as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe('name field', () => {
  const updatesNameValue = (labelText: string) => {
    it('updates ' + labelText + ' name value', () => {
      const { input } = setup(labelText);
      const name = 'Muller';
      fireEvent.change(input, { target: { value: name } });
      expect(input.value).toEqual(name);
    });
  };

  updatesNameValue('givenNameInput');
  updatesNameValue('middleNameInput');
  updatesNameValue('familyNameInput');
  updatesNameValue('additionalGivenNameInput');
  updatesNameValue('additionalMiddleNameInput');
  updatesNameValue('additionalFamilyNameInput');

  it('updates unknown value', () => {
    const { input } = setup('unknownCheckbox');
    fireEvent.click(input);
    expect(input.checked).toBeTruthy();
  });

  it('sets name inputs to UNKNOWN when unknown is checked', () => {
    const { input, ...utils } = setup('unknownCheckbox');
    const unknownName = 'UNKNOWN';
    fireEvent.click(input);
    expect(utils.getByLabelText('givenNameInput').getAttribute('value')).toEqual(unknownName);
    expect(utils.getByLabelText('familyNameInput').getAttribute('value')).toEqual(unknownName);
  });

  it('has 2 required fields for given and family name', () => {
    const { getByLabelText } = render(<PatientRegistration />);
    expect(getByLabelText('givenNameInput').getAttribute('required')).not.toBeNull();
    expect(getByLabelText('familyNameInput').getAttribute('required')).not.toBeNull();
  });
});

describe('gender field', () => {
  it('selects gender value', () => {
    const utils = render(<PatientRegistration />);
    const selectInput = utils.getByLabelText('genderSelect') as HTMLSelectElement;
    const genderValue = 'F';
    fireEvent.change(selectInput, { target: { value: genderValue } });
    expect(selectInput.value).toEqual(genderValue);
  });

  it('has a required field for gender', () => {
    const { getByLabelText } = render(<PatientRegistration />);
    expect(getByLabelText('genderSelect').getAttribute('required')).not.toBeNull();
  });
});

describe('birthdate field', () => {
  const updatesDateValues = (labelText: string, expectedDate: Date) => {
    it('updates ' + labelText + 'value', () => {
      const { input } = setup(labelText);
      fireEvent.change(input, { target: { valueAsDate: expectedDate } });
      expect(input.valueAsDate).toEqual(expectedDate);
    });
  };

  updatesDateValues('birthdateInput', dayjs('2020-05-02', 'YYYY-MM-DD').toDate());
  updatesDateValues('birthtimeInput', dayjs('', 'HH:mm').toDate());

  it('updates estimate value', () => {
    const { input } = setup('estimateCheckbox');
    fireEvent.click(input);
    expect(input.checked).toBeTruthy();
  });

  it('shows age input (years and months) when estimate is checked', () => {
    const { input, ...utils } = setup('estimateCheckbox');
    expect(utils.queryByLabelText('yearsInput')).toBeNull();
    expect(utils.queryByLabelText('monthsInput')).toBeNull();
    fireEvent.click(input);
    expect(utils.queryAllByLabelText('yearsInput')).toHaveLength(1);
    expect(utils.queryAllByLabelText('monthsInput')).toHaveLength(1);
  });

  // TO BE COMPLETED
  it('updates birthdate value by subtracting age input (years and months) values', () => {
    expect(true).toBeTruthy();
  });

  it('has a required birthdate field', () => {
    const { getByLabelText } = render(<PatientRegistration />);
    expect(getByLabelText('birthdateInput').getAttribute('required')).not.toBeNull();
  });

  // TO BE COMPLETED
  it('cannot be a date in the future', () => {
    expect(true).toBeTruthy();
  });
});

describe('address field', () => {
  const updatesAddressTextValue = (labelText: string) => {
    it('updates ' + labelText + ' address text value', () => {
      const { input } = setup(labelText);
      const addressText = 'My Test Address';
      fireEvent.change(input, { target: { value: addressText } });
      expect(input.value).toEqual(addressText);
    });
  };

  const updatesDateValues = (labelText: string, expectedDate: Date) => {
    it('updates ' + labelText + 'value', () => {
      const { input } = setup(labelText);
      fireEvent.change(input, { target: { valueAsDate: expectedDate } });
      expect(input.valueAsDate).toEqual(expectedDate);
    });
  };

  updatesAddressTextValue('address1Input');
  updatesAddressTextValue('address2Input');
  updatesAddressTextValue('cityVillageInput');
  updatesAddressTextValue('stateProvinceInput');
  updatesAddressTextValue('postalCodeInput');
  updatesAddressTextValue('countryInput');

  updatesDateValues('startDateInput', dayjs('2020-05-02', 'YYYY-MM-DD').toDate());
  updatesDateValues('endDateInput', dayjs('2020-06-04', 'YYYY-MM-DD').toDate());
});
