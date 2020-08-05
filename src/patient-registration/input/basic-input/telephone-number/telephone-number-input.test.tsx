import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { TelephoneNumberInput } from './telephone-number-input.component';

describe('telephone number input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ telephoneNumber: '' }} onSubmit={null}>
        <Form>
          <TelephoneNumberInput label="telephoneNumber" placeholder="Enter telephone number" name="telephoneNumber" />
        </Form>
      </Formik>,
    );
    return getByLabelText('telephoneNumber') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('tel');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = '0800001066';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});
