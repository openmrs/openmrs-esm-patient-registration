import * as Yup from 'yup';

export function validationSchema(config) {
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
    attributes: Yup.array().of(
      Yup.object()
        .shape({})
        .test('Attribute test', 'Attribute validation', function() {
          if (config.personAttributes.length) {
            const attributes = this.parent;
            config.personAttributes.map((p, i) => {
              if (p.validation.required && attributes[i].value === undefined) {
                throw this.createError({
                  path: `attributes[${i}].value`,
                  message: `${p.label} is required`,
                });
              }

              if (p.validation.min && attributes[i].value === undefined) {
                throw this.createError({
                  path: `attributes[${i}].value`,
                  message: `${p.label} is required`,
                });
              } else if (p.validation.min && attributes[i].value.length <= p.validation.min) {
                throw this.createError({
                  path: `attributes[${i}].value`,
                  message: `${p.label} should have a minimum of  ${p.validation.min} characters`,
                });
              }

              if (p.validation.max && attributes[i].value === undefined) {
                throw this.createError({
                  path: `attributes[${i}].value`,
                  message: `${p.label} is required`,
                });
              } else if (p.validation.max && attributes[i].value.length > p.validation.max) {
                throw this.createError({
                  path: `attributes[${i}].value`,
                  message: `${p.label} should have a maximum of ${p.validation.max} characters`,
                });
              }

              if (p.validation.matches && p.validation.matches != '') {
                const regex = RegExp(p.validation.matches);
                if (!regex.test(attributes[i].value)) {
                  throw this.createError({
                    path: `attributes[${i}].value`,
                    message: `Unexpected characters used in ${p.label} `,
                  });
                }
              }
            });
          }

          return true;
        }),
    ),
  });
}
