import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { initialFormValues } from '../../patient-registration.component';
import { IdentifierSection } from './identifiers-section.component';
import { PatientIdentifierType } from '../../patient-registration-helper';
import { validationSchema } from './../../validation/patient-registration-validation';

describe('identifiers section', () => {
  const openMrsId = {
    name: 'OpenMRS ID',
    fieldName: 'openMrsId',
    required: true,
    uuid: '05a29f94-c0ed-11e2-94be-8c13b969e334',
    format: null,
    isPrimary: true,
    identifierSources: [
      {
        uuid: '691eed12-c0f1-11e2-94be-8c13b969e334',
        name: 'Generator 1 for OpenMRS ID',
        autoGenerationOption: {
          manualEntryEnabled: false,
          automaticGenerationEnabled: true,
        },
      },
      {
        uuid: '01af8526-cea4-4175-aa90-340acb411771',
        name: 'Generator 2 for OpenMRS ID',
        autoGenerationOption: {
          manualEntryEnabled: true,
          automaticGenerationEnabled: true,
        },
      },
    ],
    autoGenerationSource: null,
  };

  const legacyId = {
    name: 'Legacy ID',
    fieldName: 'legacyId',
    required: true,
    uuid: '42ae5ce0-d64b-11ea-9064-5adc43bbdd24',
    format: null,
    isPrimary: true,
    identifierSources: [
      {
        uuid: '75df804e-03c1-4964-842b-4fec585839e7',
        name: 'Generator for Legacy ID',
        autoGenerationOption: {
          manualEntryEnabled: true,
          automaticGenerationEnabled: false,
        },
      },
    ],
    autoGenerationSource: null,
  };

  const setupSection = async (identifierTypes: Array<PatientIdentifierType>) => {
    render(
      <Formik initialValues={{ ...initialFormValues }} onSubmit={null}>
        <Form>
          <IdentifierSection
            identifierTypes={identifierTypes}
            validationSchema={validationSchema}
            setValidationSchema={() => {}}
            inEditMode={false}
            values={initialFormValues}
          />
        </Form>
      </Formik>,
    );
    return {
      allInputs: screen.queryAllByLabelText((content, element) => element.tagName.toLowerCase() === 'input'),
      allSelects: screen.queryAllByRole('combobox'),
    };
  };

  it('should have correct number of input and select elements', async () => {
    // setup
    const identifierTypes = [openMrsId, legacyId];
    // replay
    const { allInputs, allSelects } = await setupSection(identifierTypes);
    // verify
    expect(allInputs.length).toBe(2);
    expect(allSelects.length).toBe(1);
  });

  it('should filter out auto-generated identifier types', async () => {
    // setup
    openMrsId.identifierSources = [
      {
        uuid: '691eed12-c0f1-11e2-94be-8c13b969e334',
        name: 'Generator 1 for OpenMRS ID',
        autoGenerationOption: {
          manualEntryEnabled: false,
          automaticGenerationEnabled: true,
        },
      },
    ];
    const identifierTypes = [openMrsId, legacyId];
    // replay
    const { allInputs, allSelects } = await setupSection(identifierTypes);
    // verify
    expect(allInputs.length).toBe(1);
    expect(allSelects.length).toBe(0);
  });

  it('should not render identifier input if type has source(s) but no auto-gen option', async () => {
    // setup
    openMrsId.identifierSources[0].autoGenerationOption = null;
    const identifierTypes = [openMrsId];
    // replay
    const { allInputs, allSelects } = await setupSection(identifierTypes);
    // verify
    expect(allInputs.length).toBe(0);
    expect(allSelects.length).toBe(0);
  });

  it('should not render identifier input if auto-gen option is not manual enabled', async () => {
    // setup
    openMrsId.identifierSources = [
      {
        uuid: '691eed12-c0f1-11e2-94be-8c13b969e334',
        name: 'Generator 1 for OpenMRS ID',
        autoGenerationOption: {
          manualEntryEnabled: false,
          automaticGenerationEnabled: true,
        },
      },
    ];
    const identifierTypes = [openMrsId];
    // replay
    const { allInputs, allSelects } = await setupSection(identifierTypes);
    // verify
    expect(allInputs.length).toBe(0);
    expect(allSelects.length).toBe(0);
  });

  it('should not render the identifier section without identifier inputs ', async () => {
    const { allInputs, allSelects } = await setupSection([]);
    expect(allInputs.length).toBe(0);
    expect(allSelects.length).toBe(0);
  });
});
