import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { TextInput } from './text-input.component';

describe('telephone number input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ text: '' }} onSubmit={null}>
        <Form>
          <TextInput label="text" placeholder="Enter text" name="text" />
        </Form>
      </Formik>,
    );
    return getByLabelText('text') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('text');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = 'Some text';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});
