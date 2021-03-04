import * as Yup from 'yup';

export const validationSchema = Yup.object({
  givenName: Yup.string()
    .required('Given name is required')
    .test('alphabets', 'Only letters (A-Z,a-z) are allowed', value => {
      return /^[A-Za-z]+$/.test(value);
    }),
  middleName: Yup.string().test('alphabets', 'Only letters (A-Z,a-z) are allowed', value => {
    return /^[A-Za-z]+$/.test(value);
  }),
  familyName: Yup.string()
    .required('Family name is required')
    .test('alphabets', 'Only letters (A-Z,a-z) are allowed', value => {
      return /^[A-Za-z]+$/.test(value);
    }),
  additionalGivenName: Yup.string().when('addNameInLocalLanguage', {
    is: true,
    then: Yup.string().required('Given name is required'),
    otherwise: Yup.string().notRequired(),
  }),
  additionalFamilyName: Yup.string().when('addNameInLocalLanguage', {
    is: true,
    then: Yup.string().required('Family name is required'),
    otherwise: Yup.string().notRequired(),
  }),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other', 'Unknown'], 'Gender is unspecified')
    .required('Gender is required'),
  birthdate: Yup.date()
    .required('Birthdate is required')
    .max(Date(), 'Birthdate cannot be in the future')
    .nullable(),
  yearsEstimated: Yup.number().min(0, 'Years cannot be less than 0'),
  monthsEstimated: Yup.number().min(0, 'Months cannot be less than 0'),
  deathDate: Yup.date()
    .max(Date(), 'Date of Death cannot be in the future')
    .nullable(),
});
