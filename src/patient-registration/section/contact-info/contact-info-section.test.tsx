import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { ContactInfoSection } from './contact-info-section.component';

describe('contact info section', () => {
  const setupSection = async () => {
    const { container } = render(
      <Formik initialValues={{}} onSubmit={null}>
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

  it('has the correct number of inputs', async () => {
    const inputNames = await setupSection();
    expect(inputNames.length).toBe(7);
  });

  it('has telephone number input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('telephoneNumber');
  });

  it('has address input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('address1');
    expect(inputNames).toContain('address2');
    expect(inputNames).toContain('cityVillage');
    expect(inputNames).toContain('stateProvince');
    expect(inputNames).toContain('country');
    expect(inputNames).toContain('postalCode');
  });
});
