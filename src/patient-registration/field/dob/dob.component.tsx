import React from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { generateFormatting } from '../../date-util';

export const DobField: React.FC = () => {
  const { t } = useTranslation();
  const [field, meta] = useField('birthdate');
  const { setFieldValue } = React.useContext(PatientRegistrationContext);
  const { parse, format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const onDateStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const date = parse(value);
    setFieldValue('birthdate', date);
  };

  const onDateChange = ([birthdate]) => {
    setFieldValue('birthdate', birthdate);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 className={styles.productiveHeading02Light}>{t('dobLabelText')}</h4>
      <DatePicker dateFormat="d/m/Y" datePickerType="single" light onChange={onDateChange}>
        <DatePickerInput
          id="birthdate"
          placeholder="dd/mm/yyyy"
          labelText={t('dateOfBirthLabelText')}
          invalid={!!(meta.touched && meta.error)}
          invalidText={meta.error}
          {...field}
          value={format(field.value)}
          onChange={onDateStringChange}
        />
      </DatePicker>
    </div>
  );
};
