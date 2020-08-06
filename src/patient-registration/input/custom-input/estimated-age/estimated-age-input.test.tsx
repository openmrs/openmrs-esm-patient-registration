import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { EstimatedAgeInput } from './estimated-age-input.component';

describe('estimated age input', () => {
  const mockSetBirthdate = jest.fn();

  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ years: 0, months: 0 }} onSubmit={null}>
        <Form>
          <EstimatedAgeInput yearsName="years" monthsName="months" setBirthdate={mockSetBirthdate} />
        </Form>
      </Formik>,
    );
    const years = getByLabelText('Years') as HTMLInputElement;
    const months = getByLabelText('Months') as HTMLInputElement;

    return {
      years,
      months,
    };
  };

  it('exists', async () => {
    const inputs = await setupInput();
    expect(inputs.years.type).toEqual('number');
    expect(inputs.months.type).toEqual('number');
  });

  it('calls setBirthdate', async () => {
    mockSetBirthdate.mockReset();
    await setupInput();
    expect(mockSetBirthdate.mock.calls.length).toBe(1);
  });
});
