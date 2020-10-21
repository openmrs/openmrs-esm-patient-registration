import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import { DummyDataInput, dummyFormValues } from './dummy-data-input.component';
import { FormValues, initialFormValues } from '../../patient-registration.component';

const { Form, Formik } = jest.requireActual('formik');
const mockSetValues = jest.fn();

jest.mock('formik', () => {
  return {
    useFormikContext: () => ({
      setValues: mockSetValues,
    }),
  };
});

describe('dummy data input', () => {
  const setupInput = async () => {
    render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <DummyDataInput />
        </Form>
      </Formik>,
    );
    return screen.getByLabelText('Dummy Data Input') as HTMLButtonElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('button');
  });

  it('can input data on button click', async () => {
    const input = await setupInput();

    fireEvent.click(input);
    await wait();
    expect(mockSetValues).toHaveBeenCalled();
  });
});
