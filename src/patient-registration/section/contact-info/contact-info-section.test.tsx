import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { ContactInfoSection } from './contact-info-section.component';

describe('contact info section', () => {
  const setupSection = async () => {
    render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <ContactInfoSection />
        </Form>
      </Formik>,
    );
    const allInputs = screen.getAllByRole('textbox') as Array<HTMLInputElement>;
    let inputNames = [];
    allInputs.forEach(input => inputNames.push(input.name));
    return inputNames;
  };

  it('has the correct number of inputs', async () => {
    const inputNames = await setupSection();
    expect(inputNames.length).toBe(6);
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
