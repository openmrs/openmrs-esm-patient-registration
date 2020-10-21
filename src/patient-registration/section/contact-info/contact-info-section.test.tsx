import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { ContactInfoSection } from './contact-info-section.component';

const getInputElementsCount = () => {
  return [screen.getAllByRole('textbox'), screen.getAllByLabelText('Search Address')].reduce(
    (sum, inputType) => sum + inputType.length,
    0,
  );
};

describe('contact info section', () => {
  const setupSection = async () => {
    render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <ContactInfoSection />
        </Form>
      </Formik>,
    );
  };

  it('has the correct number of inputs', async () => {
    await setupSection();
    expect(getInputElementsCount()).toBe(7);
  });

  it('has address input', async () => {
    await setupSection();
    expect(screen.getByLabelText('address1')).toBeTruthy();
    expect(screen.getByLabelText('address2')).toBeTruthy();
    expect(screen.getByLabelText('cityVillage')).toBeTruthy();
    expect(screen.getByLabelText('stateProvince')).toBeTruthy();
    expect(screen.getByLabelText('country')).toBeTruthy();
    expect(screen.getByLabelText('postalCode')).toBeTruthy();
    expect(screen.getByLabelText('Search Address')).toBeTruthy();
  });
});
