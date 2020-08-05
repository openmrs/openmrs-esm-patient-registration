import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { NumberInput } from './number-input.component';

describe('number input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ number: 0 }} onSubmit={null}>
        <Form>
          <NumberInput label="number" name="number" />
        </Form>
      </Formik>,
    );
    return getByLabelText('number') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('number');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = 1;

    fireEvent.change(input, { target: { valueAsNumber: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.valueAsNumber).toEqual(expected);
  });
});
