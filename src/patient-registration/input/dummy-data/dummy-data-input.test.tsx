import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { DummyDataInput, dummyFormValues } from './dummy-data-input.component';
import { FormValues } from '../../patient-registration.component';

describe('dummy data input', () => {
  let expectedFormValues: FormValues = {
    givenName: '',
    middleName: '',
    familyName: '',
    unidentifiedPatient: false,
    gender: '',
    birthdate: null,
    yearsEstimated: 0,
    monthsEstimated: 0,
    birthdateEstimated: false,
    telephoneNumber: '',
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    country: '',
    postalCode: '',
  };

  const setupInput = async () => {
    const { getByLabelText } = render(
      <DummyDataInput
        setValues={values => {
          expectedFormValues = values;
        }}
      />,
    );
    return getByLabelText('dummy data input') as HTMLButtonElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('button');
  });

  it('can input data on button click', async () => {
    const input = await setupInput();

    fireEvent.click(input);
    await wait();

    expect(expectedFormValues).toEqual(dummyFormValues);
  });
});
