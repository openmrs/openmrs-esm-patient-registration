import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { initialFormValues } from '../../patient-registration.component';
import { DemographicsSection } from './demographics-section.component';

const getInputElementsCount = section => {
  return [
    section.getAllByRole('textbox'),
    section.getAllByLabelText('birthdate'),
    section.queryAllByLabelText('yearsEstimated'),
    section.queryAllByLabelText('monthsEstimated'),
    section.getAllByRole('checkbox'),
    section.getAllByRole('combobox'),
  ].reduce((sum, inputType) => sum + inputType.length, 0);
};

describe('demographics section', () => {
  const setupSection = async () => {
    const { getByLabelText, queryByLabelText, getAllByRole, getAllByLabelText, queryAllByLabelText } = render(
      <Formik initialValues={{ ...initialFormValues }} onSubmit={null}>
        <Form>
          <DemographicsSection />
        </Form>
      </Formik>,
    );
    return { getByLabelText, queryByLabelText, getAllByRole, getAllByLabelText, queryAllByLabelText };
  };

  it('has the correct number of inputs if birthdate is not estimated', async () => {
    const section = await setupSection();
    expect(getInputElementsCount(section)).toBe(8);
  });

  it('has the correct number of inputs if birthdate is estimated', async () => {
    const section = await setupSection();
    const birthdateEstimatedCheckbox = section.getByLabelText('birthdateEstimated');
    fireEvent.click(birthdateEstimatedCheckbox);
    await wait();
    expect(getInputElementsCount(section)).toBe(10);
  });

  it('has the correct number of inputs if birthdate is estimated and additional name is provided', async () => {
    const section = await setupSection();
    const birthdateEstimatedCheckbox = section.getByLabelText('birthdateEstimated');
    const addNameInLocalLanguageCheckbox = section.getByLabelText('addNameInLocalLanguage');
    fireEvent.click(birthdateEstimatedCheckbox);
    fireEvent.click(addNameInLocalLanguageCheckbox);
    await wait();
    expect(getInputElementsCount(section)).toBe(13);
  });

  it('has name input', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('givenName')).toBeTruthy();
    expect(section.getByLabelText('middleName')).toBeTruthy();
    expect(section.getByLabelText('familyName')).toBeTruthy();
  });

  it('has name in local language checkbox', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('addNameInLocalLanguage')).toBeTruthy();
  });

  it('has name in local language input fields when checkbox is clicked', async () => {
    const section = await setupSection();
    const addNameInLocalLanguageCheckbox = section.getByLabelText('addNameInLocalLanguage');
    fireEvent.click(addNameInLocalLanguageCheckbox);
    await wait();
    expect(section.getByLabelText('additionalGivenName')).toBeTruthy();
    expect(section.getByLabelText('additionalMiddleName')).toBeTruthy();
    expect(section.getByLabelText('additionalFamilyName')).toBeTruthy();
  });

  it('does not have name in local language input fields when checkbox is not clicked', async () => {
    const section = await setupSection();
    expect(section.queryByLabelText('additionalGivenName')).toBeFalsy();
    expect(section.queryByLabelText('additionalMiddleName')).toBeFalsy();
    expect(section.queryByLabelText('additionalFamilyName')).toBeFalsy();
  });

  it('has unidentified patient input', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('unidentifiedPatient')).toBeTruthy();
  });

  it('has gender select input', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('gender')).toBeTruthy();
  });

  it('has date input', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('birthdate')).toBeTruthy();
  });

  it('has estimated age inputs when checkbox is clicked', async () => {
    const section = await setupSection();
    const birthdateEstimatedCheckbox = section.getByLabelText('birthdateEstimated');
    fireEvent.click(birthdateEstimatedCheckbox);
    await wait();
    expect(section.getByLabelText('yearsEstimated')).toBeTruthy();
    expect(section.getByLabelText('monthsEstimated')).toBeTruthy();
  });

  it('has no estimated age inputs when checkbox is not clicked', async () => {
    const section = await setupSection();
    expect(section.queryByLabelText('yearsEstimated')).toBeFalsy();
    expect(section.queryByLabelText('monthsEstimated')).toBeFalsy();
  });

  it('has checkbox input for estimated birthdate', async () => {
    const section = await setupSection();
    expect(section.getByLabelText('birthdateEstimated')).toBeTruthy();
  });
});
