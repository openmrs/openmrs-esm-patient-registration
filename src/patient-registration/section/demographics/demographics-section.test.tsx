import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { FormValues } from '../../patient-registration.component';
import { DemographicsSection } from './demographics-section.component';

describe('demographics section', () => {
  const initialFormValues: FormValues = {
    givenName: '',
    middleName: '',
    familyName: '',
    unidentifiedPatient: false,
    additionalGivenName: '',
    additionalMiddleName: '',
    additionalFamilyName: '',
    addNameInLocalLanguage: false,
    gender: '',
    birthdate: null,
    yearsEstimated: 0,
    monthsEstimated: 0,
    birthdateEstimated: false,
    telephoneNumber: '',
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    country: '',
    postalCode: '',
  };

  const setupSection = async (birthdateEstimated?: boolean, addNameInLocalLanguage?: boolean) => {
    const { container } = render(
      <Formik initialValues={{ ...initialFormValues, birthdateEstimated, addNameInLocalLanguage }} onSubmit={null}>
        <Form>
          <DemographicsSection
            setFieldValue={() => {}}
            values={{ ...initialFormValues, birthdateEstimated, addNameInLocalLanguage }}
          />
        </Form>
      </Formik>,
    );
    const allInputs = container.querySelectorAll('input');
    const allSelects = container.querySelectorAll('select');
    let inputAndSelectNames = [];
    allInputs.forEach(input => inputAndSelectNames.push(input.name));
    allSelects.forEach(select => inputAndSelectNames.push(select.name));
    return inputAndSelectNames;
  };

  it('has the correct number of inputs if birthdate is not estimated', async () => {
    const inputNames = await setupSection(false);
    expect(inputNames.length).toBe(8);
  });

  it('has the correct number of inputs if birthdate is estimated', async () => {
    const inputNames = await setupSection(true);
    expect(inputNames.length).toBe(10);
  });

  it('has name input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('givenName');
    expect(inputNames).toContain('middleName');
    expect(inputNames).toContain('familyName');
  });

  it('has name in local language checkbox', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('addNameInLocalLanguage');
  });

  it('has name in local language input fields when checkbox is clicked', async () => {
    const inputNames = await setupSection(false, true);
    expect(inputNames).toContain('additionalGivenName');
    expect(inputNames).toContain('additionalMiddleName');
    expect(inputNames).toContain('additionalFamilyName');
  });

  it('does not have name in local language input fields when checkbox is unclicked', async () => {
    const inputNames = await setupSection(false, false);
    expect(inputNames).not.toContain('additionalGivenName');
    expect(inputNames).not.toContain('additionalMiddleName');
    expect(inputNames).not.toContain('additionalFamilyName');
  });

  it('has unidentified patient input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('unidentifiedPatient');
  });

  it('has gender select input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('gender');
  });

  it('has date input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('birthdate');
  });

  it('has estimated age input', async () => {
    const inputNames = await setupSection(true);
    expect(inputNames).toContain('yearsEstimated');
    expect(inputNames).toContain('monthsEstimated');
  });

  it('has no estimated age input if birthdate is not estimated', async () => {
    const inputNames = await setupSection(false);
    expect(inputNames).not.toContain('yearsEstimated');
    expect(inputNames).not.toContain('monthsEstimated');
  });

  it('has birthdate checkbox input', async () => {
    const inputNames = await setupSection();
    expect(inputNames).toContain('birthdateEstimated');
  });
});
