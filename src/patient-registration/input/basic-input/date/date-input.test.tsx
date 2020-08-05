import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { DateInput } from './date-input.component';

describe('date input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ date: '' }} onSubmit={null}>
        <Form>
          <DateInput name="date" />
        </Form>
      </Formik>,
    );
    return getByLabelText('date') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('date');
  });

  it('can input data', async () => {
    const input = await setupInput();
    const expected = '1990-09-10';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});
