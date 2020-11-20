import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { Input } from '../../basic-input/input/input.component';
import { FormValues } from '../../../patient-registration.component';
import styles from './../../input.scss';

interface EstimatedAgeInputProps {
  yearsName: string;
  monthsName: string;
}

export const EstimatedAgeInput: React.FC<EstimatedAgeInputProps> = ({ yearsName, monthsName }) => {
  const { setFieldValue } = useFormikContext<FormValues>();
  const [yearsField] = useField(yearsName);
  const [monthsField] = useField(monthsName);

  useEffect(() => {
    if (yearsField.value > 0 || monthsField.value > 0) {
      setFieldValue(
        'birthdate',
        dayjs()
          .subtract(yearsField.value, 'year')
          .subtract(monthsField.value, 'month')
          .toISOString()
          .split('T')[0],
      );
    }
  }, [yearsField.value, monthsField.value, setFieldValue]);

  return (
    <main className={styles.fieldRow}>
      <Input type="number" label="Years" name={yearsName} />
      <Input type="number" label="Months" name={monthsName} />
    </main>
  );
};
