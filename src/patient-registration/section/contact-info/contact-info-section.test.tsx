import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { ContactInfoSection } from './contact-info-section.component';

describe('contact info section', () => {
  const setupInput = async () => {
    const { container } = render(
      <Formik initialValues={{ }} onSubmit={null}>
        <Form>
          <ContactInfoSection />
        </Form>
      </Formik>,
    );
    const allInputs = container.querySelectorAll('input');
    let inputNames = [];
    allInputs.forEach(input => inputNames.push(input.name));
    return inputNames;
  };

  it('has 7 inputs in total', async () => {
    const inputNames = await setupInput();
    expect(inputNames.length).toBe(7);
  });

  it('has telephone number input', async () => {
    const inputNames = await setupInput();
    expect(inputNames).toContain('telephoneNumber');
  });

  it('has address input', async () => {
    const inputNames = await setupInput();
    expect(inputNames).toContain('address1');
    expect(inputNames).toContain('address2');
    expect(inputNames).toContain('cityVillage');
    expect(inputNames).toContain('stateProvince');
    expect(inputNames).toContain('country');
    expect(inputNames).toContain('postalCode');
  });
});
