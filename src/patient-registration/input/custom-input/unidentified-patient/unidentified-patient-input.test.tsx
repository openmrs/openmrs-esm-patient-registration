import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { UnidentifiedPatientInput } from './unidentified-patient-input.component';

describe('unidentified patient input', () => {
  const mockSetName = jest.fn();

  const setupInput = async unidentifiedPatient => {
    const { getByLabelText } = render(
      <Formik initialValues={{ unidentifiedPatient: unidentifiedPatient }} onSubmit={null}>
        <Form>
          <UnidentifiedPatientInput name="unidentifiedPatient" setName={mockSetName} />
        </Form>
      </Formik>,
    );
    return getByLabelText('unidentifiedPatient') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput(false);
    expect(input.type).toEqual('checkbox');
  });

  it('sets givenName, middleName and familyName to "UNKNOWN" if patient is marked as unidentified', async () => {
    mockSetName.mockReset();
    await setupInput(true);
    expect(mockSetName.mock.calls.length).toBe(3);
    expect(mockSetName).toHaveBeenCalledWith('givenName', 'UNKNOWN');
    expect(mockSetName).toHaveBeenCalledWith('middleName', 'UNKNOWN');
    expect(mockSetName).toHaveBeenCalledWith('familyName', 'UNKNOWN');
  });

  it('does not override givenName, middleName and familyName if patient is identified', async () => {
    mockSetName.mockReset();
    await setupInput(false);
    expect(mockSetName.mock.calls.length).toBe(0);
  });
});
