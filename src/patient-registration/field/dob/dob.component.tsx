import React from 'react';
import styles from '../field.scss';
import DatePicker from 'carbon-components-react/es/components/DatePicker';
import DatePickerInput from 'carbon-components-react/es/components/DatePickerInput';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { PatientRegistrationContext } from '../../patient-registration-context';

export const DobField: React.FC = () => {
  const { t } = useTranslation();
  const [field, meta] = useField('birthdate');
  const { setFieldValue } = React.useContext(PatientRegistrationContext);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue('birthdate', value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 className={styles.productiveHeading02Light}>{t('dobLabelText')}</h4>
      <DatePicker dateFormat="d/m/Y" datePickerType="single" light>
        <DatePickerInput
          id="birthdate"
          placeholder="dd/mm/yyyy"
          labelText={t('dateOfBirthLabelText')}
          invalid={!!(meta.touched && meta.error)}
          invalidText={meta.error}
          {...field}
          value={field.value ?? ''}
          onChange={onDateChange}
        />
      </DatePicker>
    </div>
  );
};
