import * as Yup from 'yup';

const telephoneNumberRegex = /^[0-9]*$/;

export const validationSchema = Yup.object({
  givenName: Yup.string().required('Given name is required'),
  familyName: Yup.string().required('Family name is required'),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other', 'Unknown'], 'Gender is unspecified')
    .required('Gender is required'),
  birthdate: Yup.date()
    .required('Birthdate is required')
    .max(Date(), 'Birthdate cannot be in the future')
    .nullable(),
  yearsEstimated: Yup.number().min(0, 'Years cannot be less than 0'),
  monthsEstimated: Yup.number().min(0, 'Months cannot be less than 0'),
  telephoneNumber: Yup.string().matches(telephoneNumberRegex, 'Telephone number should only contain digits'),
  contactPersonGivenName: Yup.string().when(
    ['contactPersonMiddleName', 'contactPersonFamilyName', 'contactPersonTelephoneNumber', 'contactPersonRelationship'],
    {
      is: (contactPersonMiddleName, contactPersonFamilyName, contactPersonTelephoneNumber, contactPersonRelationship) =>
        contactPersonMiddleName || contactPersonFamilyName || contactPersonTelephoneNumber || contactPersonRelationship,
      then: Yup.string().required('Given name is required'),
    },
  ),
  contactPersonTelephoneNumber: Yup.string().matches(
    telephoneNumberRegex,
    'Telephone number should only contain digits',
  ),
});
