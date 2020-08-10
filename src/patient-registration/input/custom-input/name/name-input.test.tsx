import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { NameInput } from './name-input.component';

describe('name input', () => {
  const setupInput = async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <NameInput givenName="givenName" middleName="middleName" familyName="familyName" />
        </Form>
      </Formik>,
    );
    const givenNameInput = getByLabelText('Given Name') as HTMLInputElement;
    const middleNameInput = getByLabelText('Middle Name') as HTMLInputElement;
    const familyNameInput = getByLabelText('Family Name') as HTMLInputElement;

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
