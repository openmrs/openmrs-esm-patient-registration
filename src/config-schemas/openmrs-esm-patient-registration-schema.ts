import { Type, validators } from '@openmrs/esm-config';
const builtInFields = ['name', 'gender', 'dob', 'address', 'id', 'death'];
export const esmPatientRegistrationSchema = {
  sections: {
    _type: Type.Array,
    _default: ['demographics', 'contact', 'ids', 'death'],
    _description: "An array of strings which are the keys from 'sectionDefinitions'",
    _elements: {
      _type: Type.String,
    },
  },
  sectionDefinitions: {
    _type: Type.Object,
    _elements: {
      name: {
        _type: Type.String,
        _default: '',
        _description: 'The title to display at the top of the section.',
      },
      fields: {
        _type: Type.Array,
        _default: [],
        _description: `The parts to include in the section. Can be any of the following built-in fields: ${builtInFields.join(
          ', ',
        )}. Can also be any of the keys from the fieldDefinitions object, which you can use to define custom fields.`,
        _elements: { _type: Type.String }, // another validator at top level
      },
    },
    _default: {
      demographics: { name: 'Demographics', fields: ['name', 'gender', 'dob'] },
      contact: { name: 'Contact Info', fields: ['address'] },
      ids: { name: 'Identifiers', fields: ['id'] },
      death: { name: 'Death Info', fields: ['death'] },
    },
  },
  fieldDefinitions: {
    _type: Type.Object,
    _elements: {
      label: { _type: Type.String, _description: 'The label of the input' },
      uuid: {
        _type: Type.UUID,
        _description: 'Person attributetype uuid used to save the attribute',
      },
      placeholder: {
        _type: Type.String,
        _default: '',
        _description: 'Placeholder that will appear in the input.',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    _default: {
      phone: {
        label: 'Telophone Number',
        uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
        validation: { required: true, matches: '^[0-9]*$' },
      },
    },
    _description:
      'Definitions for custom fields that can be used in sectionDefinitions. Can also be used to override built-in fields.',
  },
  links: {
    submitButton: {
      _type: Type.String,
      _default: '${openmrsSpaBase}/patient/${patientUuid}/chart',
      _validators: [validators.isUrlWithTemplateParameters(['patientUuid'])],
    },
  },
};
