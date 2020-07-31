import { validators } from '@openmrs/esm-module-config';
export const esmPatientRegistrationSchema = {
  personAttributes: {
    arrayElements: {
      subTitle: { validators: [validators.isString] },
      label: { validators: [validators.isString] },
      uuid: { validators: [validators.isString] },
      name: { validators: [validators.isString] },
      placeholder: { validators: [validators.isString] },
      id: { validators: [validators.isString] },
      validation: { validators: [validators.isString] },
    },
    default: [
      {
        subTitle: 'Telephone Number',
        label: '',
        uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
        name: 'phoneNumber',
        placeholder: 'Enter Telephone Number',
        id: 'tel',
        validation: { required: true },
      },
      {
        subTitle: 'Birth place',
        label: '',
        uuid: '8d8718c2-c2cc-11de-8d13-0010c6dffd0f',
        name: 'birth',
        placeholder: 'Enter Birth Place',
        id: 'birth',
        validation: { required: true },
      },
    ],
  },
};
