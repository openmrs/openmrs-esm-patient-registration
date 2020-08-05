import React, { useEffect } from 'react';
import { useField } from 'formik';
import dayjs from 'dayjs';
import { NumberInput } from '../../basic-input/number/number-input.component';
import styles from './../../input.css';

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
    <main className={styles.field}>
      <h4 className={`omrs-type-body-large ${styles.subTitle}`}>Estimated Age</h4>
      <section className={styles.subField}>
        <NumberInput label="Years" name={yearsName} />
        <NumberInput label="Months" name={monthsName} />
      </section>
    </main>
  );
};
