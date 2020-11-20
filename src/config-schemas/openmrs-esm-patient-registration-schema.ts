import { Type } from '@openmrs/esm-config';

export const esmPatientRegistrationSchema = {
  personAttributeSections: {
    _type: Type.Array,
    _elements: {
      name: {
        _type: Type.String,
        _default: false,
      },
      personAttributes: {
        _type: Type.Array,
        _elements: {
          name: {
            _type: Type.String,
          },
          label: {
            _type: Type.String,
            _description: 'The label of the input',
          },
          uuid: {
            _type: Type.UUID,
            _description: 'Person attributetype uuid used to save the attribute',
          },
          placeholder: {
            _type: Type.String,
            _description: 'Placeholder that will appear in the input.',
          },
          validation: {
            required: {
              _type: Type.Boolean,
              _default: false,
            },
            matches: {
              _type: Type.String,
              _default: null,
            },
          },
        },
      },
    },
    _default: [
      {
        name: 'additionalPersonAttributesSectionHeader',
        personAttributes: [
          {
            name: 'telephoneNumber',
            label: 'phoneNumber',
            uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
            placeholder: 'phoneNumberPlaceHolder',
            validation: {
              required: true,
              matches: '^[0-9]*$',
            },
          },
        ],
      },
    ],
  },
  links: {
    submitButton: {
      _type: Type.String,
      _default: '${openmrsSpaBase}/patient/${patientUuid}/chart',
      _validators: [validators.isUrlWithTemplateParameters(['patientUuid'])],
    },
    },
  },
};
