import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { CheckboxInput } from './checkbox-input.component';

describe('checkbox input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ checkbox: false }} onSubmit={null}>
        <Form>
          <CheckboxInput label="checkbox" name="checkbox" />
        </Form>
      </Formik>,
    );
    return getByLabelText('checkbox') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('checkbox');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = true;

    fireEvent.click(input);
    fireEvent.blur(input);

    await wait();

    expect(input.checked).toEqual(expected);
  });
});
