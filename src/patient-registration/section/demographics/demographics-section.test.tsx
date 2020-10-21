import React from 'react';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { initialFormValues } from '../../patient-registration.component';
import { DemographicsSection } from './demographics-section.component';

const getInputElementsCount = () => {
  return [
    screen.getAllByRole('textbox'),
    screen.getAllByLabelText('birthdate'),
    screen.queryAllByLabelText('yearsEstimated'),
    screen.queryAllByLabelText('monthsEstimated'),
    screen.getAllByRole('checkbox'),
    screen.getAllByRole('combobox'),
  ].reduce((sum, inputType) => sum + inputType.length, 0);
};

describe('demographics section', () => {
  const setupSection = async () => {
    render(
      <Formik initialValues={{ ...initialFormValues }} onSubmit={null}>
        <Form>
          <DemographicsSection />
        </Form>
      </Formik>,
    );
  };

  it('has the correct number of inputs if birthdate is not estimated', async () => {
    await setupSection();
    expect(getInputElementsCount()).toBe(8);
  });

  it('has the correct number of inputs if birthdate is estimated', async () => {
    await setupSection();
    const birthdateEstimatedCheckbox = screen.getByLabelText('birthdateEstimated');
    fireEvent.click(birthdateEstimatedCheckbox);
    await wait();
    expect(getInputElementsCount()).toBe(10);
  });

  it('has the correct number of inputs if birthdate is estimated and additional name is provided', async () => {
    await setupSection();
    const birthdateEstimatedCheckbox = screen.getByLabelText('birthdateEstimated');
    const addNameInLocalLanguageCheckbox = screen.getByLabelText('addNameInLocalLanguage');
    fireEvent.click(birthdateEstimatedCheckbox);
    fireEvent.click(addNameInLocalLanguageCheckbox);
    await wait();
    expect(getInputElementsCount()).toBe(13);
  });

  it('has name input', async () => {
    await setupSection();
    expect(screen.getByLabelText('givenName')).toBeTruthy();
    expect(screen.getByLabelText('middleName')).toBeTruthy();
    expect(screen.getByLabelText('familyName')).toBeTruthy();
  });

  it('has name in local language checkbox', async () => {
    await setupSection();
    expect(screen.getByLabelText('addNameInLocalLanguage')).toBeTruthy();
  });

  it('has name in local language input fields when checkbox is clicked', async () => {
    await setupSection();
    const addNameInLocalLanguageCheckbox = screen.getByLabelText('addNameInLocalLanguage');
    fireEvent.click(addNameInLocalLanguageCheckbox);
    await wait();
    expect(screen.getByLabelText('additionalGivenName')).toBeTruthy();
    expect(screen.getByLabelText('additionalMiddleName')).toBeTruthy();
    expect(screen.getByLabelText('additionalFamilyName')).toBeTruthy();
  });

  it('does not have name in local language input fields when checkbox is not clicked', async () => {
    await setupSection();
    expect(screen.queryByLabelText('additionalGivenName')).toBeFalsy();
    expect(screen.queryByLabelText('additionalMiddleName')).toBeFalsy();
    expect(screen.queryByLabelText('additionalFamilyName')).toBeFalsy();
  });

  it('has unidentified patient input', async () => {
    await setupSection();
    expect(screen.getByLabelText('unidentifiedPatient')).toBeTruthy();
  });

  it('has gender select input', async () => {
    await setupSection();
    expect(screen.getByLabelText('gender')).toBeTruthy();
  });

  it('has date input', async () => {
    await setupSection();
    expect(screen.getByLabelText('birthdate')).toBeTruthy();
  });

  it('has estimated age inputs when checkbox is clicked', async () => {
    await setupSection();
    const birthdateEstimatedCheckbox = screen.getByLabelText('birthdateEstimated');
    fireEvent.click(birthdateEstimatedCheckbox);
    await wait();
    expect(screen.getByLabelText('yearsEstimated')).toBeTruthy();
    expect(screen.getByLabelText('monthsEstimated')).toBeTruthy();
  });

  it('has no estimated age inputs when checkbox is not clicked', async () => {
    await setupSection();
    expect(screen.queryByLabelText('yearsEstimated')).toBeFalsy();
    expect(screen.queryByLabelText('monthsEstimated')).toBeFalsy();
  });

  it('has checkbox input for estimated birthdate', async () => {
    await setupSection();
    expect(screen.getByLabelText('birthdateEstimated')).toBeTruthy();
  });
});
