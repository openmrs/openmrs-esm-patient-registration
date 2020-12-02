import React, { useEffect } from 'react';
import { useField } from 'formik';
import dayjs from 'dayjs';
import { Input } from '../../basic-input/input/input.component';
import styles from './../../input.scss';

interface EstimatedAgeInputProps {
  yearsName: string;
  monthsName: string;
  setBirthdate(field: string, value: any, shouldValidate?: boolean): void;
}

export const EstimatedAgeInput: React.FC<EstimatedAgeInputProps> = ({ yearsName, monthsName, setBirthdate }) => {
  const [yearsField] = useField(yearsName);
  const [monthsField] = useField(monthsName);

  useEffect(() => {
    setBirthdate(
      'birthdate',
      dayjs()
        .subtract(yearsField.value, 'year')
        .subtract(monthsField.value, 'month')
        .toISOString()
        .split('T')[0],
    );
  }, [yearsField.value, monthsField.value, setBirthdate]);

  return (
    <main className={styles.fieldRow}>
      <Input type="number" label="Years" name={yearsName} />
      <Input type="number" label="Months" name={monthsName} />
    </main>
  );
};
