import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { NameInput } from './name-input.component';

describe('name input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <NameInput givenName="givenName" middleName="middleName" familyName="familyName" showRequiredAsterisk={true} />
        </Form>
      </Formik>,
    );
    const givenNameInput = getByLabelText('givenName') as HTMLInputElement;
    const middleNameInput = getByLabelText('middleName') as HTMLInputElement;
    const familyNameInput = getByLabelText('familyName') as HTMLInputElement;

    return {
      givenNameInput,
      middleNameInput,
      familyNameInput,
    };
  };

  it('exists', async () => {
    const inputs = await setupInput();
    expect(inputs.givenNameInput.type).toEqual('text');
    expect(inputs.middleNameInput.type).toEqual('text');
    expect(inputs.familyNameInput.type).toEqual('text');
  });
});
