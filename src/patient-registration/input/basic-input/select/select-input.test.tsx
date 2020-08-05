import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SelectInput } from './select-input.component';

describe('select input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ select: '' }} onSubmit={null}>
        <Form>
          <SelectInput name="select" options={['A Option', 'B Option']} />
        </Form>
      </Formik>,
    );
    return getByLabelText('select') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('select-one');
  });

  it('can input data (cutting off option after first char)', async () => {
    const input = await setupInput();
    const expected = 'A';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});
