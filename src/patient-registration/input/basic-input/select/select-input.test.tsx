import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SelectInput } from './select-input.component';

describe('select input', () => {
  const setupSelect = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ select: '' }} onSubmit={null}>
        <Form>
          <SelectInput label="Select" name="select" options={['A Option', 'B Option']} showRequiredAsterisk={true} />
        </Form>
      </Formik>,
    );
    return getByLabelText('select') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupSelect();
    expect(input.type).toEqual('select-one');
  });

  it('can input data', async () => {
    const input = await setupSelect();
    const expected = 'A Option';

    fireEvent.change(input, { target: { value: expected } });
    fireEvent.blur(input);

    await wait();

    expect(input.value).toEqual(expected);
  });
});
