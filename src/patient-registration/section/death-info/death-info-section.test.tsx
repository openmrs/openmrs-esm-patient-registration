import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { FormValues, initialFormValues } from '../../patient-registration.component';
import { DeathInfoSection } from './death-info-section.component';

describe('death info section', () => {
  const formValues: FormValues = initialFormValues;

  const setupSection = async (isDead?: boolean) => {
    const { container } = render(
      <Formik initialValues={{ ...initialFormValues, isDead }} onSubmit={null}>
        <Form>
          <DeathInfoSection values={{ ...initialFormValues, isDead }} />
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

  it('has the correct number of inputs if is dead is checked', async () => {
    const inputAndSelectNames = await setupSection(true);
    expect(inputAndSelectNames.length).toBe(3);
  });

  it('has the correct number of inputs if is dead is not checked', async () => {
    const inputAndSelectNames = await setupSection(false);
    expect(inputAndSelectNames.length).toBe(1);
  });

  it('has isDead checkbox', async () => {
    const inputAndSelectNames = await setupSection();
    expect(inputAndSelectNames).toContain('isDead');
  });

  it('has death date if is dead is checked', async () => {
    const inputAndSelectNames = await setupSection(true);
    expect(inputAndSelectNames).toContain('deathDate');
  });

  it('has no death date if is dead is not checked', async () => {
    const inputAndSelectNames = await setupSection(false);
    expect(inputAndSelectNames).not.toContain('deathDate');
  });

  it('has death cause if is dead is checked', async () => {
    const inputAndSelectNames = await setupSection(true);
    expect(inputAndSelectNames).toContain('deathCause');
  });

  it('has no death cause if is dead is not checked', async () => {
    const inputAndSelectNames = await setupSection(false);
    expect(inputAndSelectNames).not.toContain('deathCause');
  });
});
