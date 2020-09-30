import { validators } from '@openmrs/esm-module-config';

export const esmPatientRegistrationSchema = {
  personAttributeSections: {
    arrayElements: {
      name: { default: false, validators: [validators.isString] },
      personAttributes: {
        arrayElements: {
          name: { default: false, validators: [validators.isString] },
          label: { validators: [validators.isString], description: 'The label of the input' },
          uuid: {
            validators: [validators.isString],
            description: 'Person attributetype uuid used to save the attribute',
          },
          placeholder: { validators: [validators.isString], description: 'Placeholder that will appear in the input.' },
          validation: {
            required: { default: false, validators: [validators.isBoolean] },
            matches: { default: null, validators: [validators.isString] },
          },
        },
      },
    },
    default: [
      {
        name: 'additionalPersonAttributesSectionHeader',
        personAttributes: [
          {
            name: 'telephoneNumber',
            label: 'phoneNumber',
            uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
            placeholder: 'phoneNumberPlaceHolder',
            validation: { required: true, matches: '^[0-9]*$' },
          },
        ],
      },
    ],
  },
  links: {
    submitButton: {
      default: '${openmrsSpaBase}/patient/${patientUuid}/chart',
      validators: [validators.isUrlWithTemplateParameters(['patientUuid'])],
    },
  },
};
