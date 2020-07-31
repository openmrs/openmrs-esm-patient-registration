import * as Yup from 'yup';
import { useConfig } from '@openmrs/esm-module-config';
import { AttributeValue } from './patient-registration-helper';

export function validationSchema(props) {
  return Yup.object({
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
    //telephoneNumber: Yup.string().matches(/^[0-9]*$/, 'Telephone number should only contain digits'),
    attributes: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required('Required'),
      }),
    ),
    /*  attributes: Yup.array(),
    'attributes[0]': Yup.object().shape({
      value: Yup.string().test("test1", "Type something", function () {
        return this.parent && this.parent.attributes && this.parent.attributes[0] === ""
      }),
    }),   */

    /* 'attributes[1]': Yup.object().shape({
      value: Yup.string().required('Given name is required'),
    }),   */
  });
}
