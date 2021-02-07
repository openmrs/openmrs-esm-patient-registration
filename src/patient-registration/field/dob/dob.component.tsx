import React from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';

export const DobField: React.FC = () => {
  const { t } = useTranslation();
  const [field, meta] = useField('birthdate');

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 className={styles.productiveHeading02Light}>{t('dobLabelText')}</h4>
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
          {...field}
        />
      </DatePicker>
    </div>
  );
};
