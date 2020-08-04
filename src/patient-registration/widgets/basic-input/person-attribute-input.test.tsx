import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { PersonAttributeInput } from './person-attribute-input.component';

describe('person attribute input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik
        initialValues={{
          attributes: [],
        }}
        onSubmit={null}>
        <Form>
          <PersonAttributeInput label="telephoneNumber" placeholder="Enter telephone number" name="telephoneNumber" />
        </Form>
      </Formik>,
    );
    return getByLabelText('telephoneNumber') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('text');
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
