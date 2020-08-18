import { validators } from '@openmrs/esm-module-config';
export const esmPatientRegistrationSchema = {
  personAttributes: {
    arrayElements: {
      label: { validators: [validators.isString], description: 'The label of the input' },
      uuid: { validators: [validators.isUuid], description: 'Person attributetype uuid used to save the attribute' },
      placeholder: { validators: [validators.isString], description: 'Placeholder that will appear in the input.' },
      validation: {
        required: { default: false, validators: [validators.isBoolean] },
        min: { validators: [validators.isNumber] },
        max: { validators: [validators.isNumber] },
        matches: { default: null, validators: [validators.isString] },
      },
    },
    default: [
      {
        label: 'Telephone Number',
        uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
        placeholder: 'Enter Telephone Number',
        validation: { required: true, min: 9, max: 10, matches: '^[0-9]*$' },
      },
      {
        label: 'Birth place',
        uuid: '8d8718c2-c2cc-11de-8d13-0010c6dffd0f',
        placeholder: 'Enter Birth Place',
        validation: { required: false, min: 5, max: 8 },
      },
    ],
  },
};
