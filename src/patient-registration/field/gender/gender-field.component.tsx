import React from 'react';
import { RadioButton, RadioButtonGroup, DatePicker, DatePickerInput } from 'carbon-components-react';
import styles from '../field.scss';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

export const GenderField: React.FC = () => {
  const [field, meta] = useField('birthdate');
  const { t } = useTranslation();

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('sexAndBirthLabelText')}</h4>
      <div style={{ marginBottom: '1rem' }}>
        <p className="bx--label">{t('sexLabelText')}</p>
        <RadioButtonGroup name="gender" orientation="vertical">
          <RadioButton id="male" labelText="Male" value="male" />
          <RadioButton id="female" labelText="Female" value="female" />
          <RadioButton id="other" labelText="Other" value="other" />
        </RadioButtonGroup>
      </div>
      <br />
      <div style={{ marginBottom: '1rem' }}>
        <DatePicker
          dateFormat="d/m/Y"
          datePickerType="single"
          light
          onChange={([value]) =>
            field.onChange({
              target: { type: 'input', value, id: 'birthdate', name: 'birthdate' },
            })
          }>
          <DatePickerInput
            id="birthdate"
            name="birthdate"
            placeholder="dd/mm/yyyy"
            labelText={t('dateOfBirthLabelText')}
            invalid={!!(meta.touched && meta.error)}
            invalidText={meta.error}
          />
        </DatePicker>
      </div>
    </div>
  );
};
