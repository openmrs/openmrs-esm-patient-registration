import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { AddressInput } from './address-input.component';

describe('address input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <AddressInput
            address1Name="address1Name"
            address2Name="address2Name"
            cityVillageName="cityVillageName"
            stateProvinceName="stateProvinceName"
            countryName="countryName"
            postalCodeName="postalCodeName"
          />
        </Form>
      </Formik>,
    );
    const address1Input = getByLabelText('Address 1') as HTMLInputElement;
    const address2Input = getByLabelText('Address 2') as HTMLInputElement;
    const cityVillageInput = getByLabelText('City/Village') as HTMLInputElement;
    const stateProvinceInput = getByLabelText('State/Province') as HTMLInputElement;
    const countryInput = getByLabelText('Country') as HTMLInputElement;
    const postalCodeInput = getByLabelText('Postal Code') as HTMLInputElement;

    return {
      address1Input,
      address2Input,
      cityVillageInput,
      stateProvinceInput,
      countryInput,
      postalCodeInput,
    };
  };

  it('exists', async () => {
    const inputs = await setupInput();
    expect(inputs.address1Input.type).toEqual('text');
    expect(inputs.address2Input.type).toEqual('text');
    expect(inputs.cityVillageInput.type).toEqual('text');
    expect(inputs.stateProvinceInput.type).toEqual('text');
    expect(inputs.countryInput.type).toEqual('text');
    expect(inputs.postalCodeInput.type).toEqual('text');
  });
});
