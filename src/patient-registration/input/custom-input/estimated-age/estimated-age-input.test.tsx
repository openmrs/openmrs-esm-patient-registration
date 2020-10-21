import React from 'react';

import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EstimatedAgeInput } from './estimated-age-input.component';
import { Formik, Form } from 'formik';

const mockSetFieldValue = jest.fn();
jest.mock('formik', () => {
  return {
    ...jest.requireActual('formik'),
    useFormikContext: () => ({
      setFieldValue: mockSetFieldValue,
      values: { birthdate: '', years: 0, months: 0 },
    }),
  };
});

describe('estimated age input', () => {
  const setupInput = async () => {
    render(
      <Formik initialValues={{ birthdate: '', yearsEstimated: 0, monthsEstimated: 0 }} onSubmit={null}>
        <Form>
          <EstimatedAgeInput yearsName="yearsEstimated" monthsName="monthsEstimated" />
        </Form>
      </Formik>,
    );
  };

  it('exists', async () => {
    await setupInput();
    const yearsInput = screen.getByLabelText('yearsEstimated') as HTMLInputElement;
    const monthsInput = screen.getByLabelText('monthsEstimated') as HTMLInputElement;
    expect(yearsInput.type).toEqual('number');
    expect(monthsInput.type).toEqual('number');
  });

  it('does not set birthdate form value when component is mounting', async () => {
    await setupInput();
    expect(mockSetFieldValue).toHaveBeenCalledTimes(0);
  });

  it('sets birthdate form value to calculated date', async () => {
    await setupInput();
    const yearsInput = screen.getByLabelText('yearsEstimated') as HTMLInputElement;
    const monthsInput = screen.getByLabelText('monthsEstimated') as HTMLInputElement;

    const estimatedYears = 30;
    const esttimatedMonths = 6;

    //mock dayjs to not rely on date calculation?
    const date = new Date();
    date.setFullYear(date.getFullYear() - estimatedYears);
    date.setMonth(date.getMonth() - esttimatedMonths);
    const estimatedBirthdate = date.toISOString().split('T')[0];

    userEvent.type(yearsInput, estimatedYears.toString());
    userEvent.type(monthsInput, esttimatedMonths.toString());

    await wait();
    expect(mockSetFieldValue).toHaveBeenCalledWith('birthdate', estimatedBirthdate);
  });
});
