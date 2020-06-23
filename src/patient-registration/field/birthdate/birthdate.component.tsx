import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './../field.css';

interface BirthdateProps {
  birthdateValue: Date;
  birthdateEstimatedValue: boolean;
  birthtimeValue: Date;
  onBirthdateChange(birthdate: Date): void;
  onBirthdateEstimatedChange(birthdateEstimated: boolean): void;
  onBirthtimeChange(birthtime: Date): void;
}

export function Birthdate(props: BirthdateProps) {
  const [age, setAge] = useState<{ years: number; months: number }>({
    years: 0,
    months: 0,
  });

  useEffect(() => {
    if (age.years !== 0 || age.months !== 0) {
      props.onBirthdateChange(
        dayjs()
          .subtract(age.years, 'year')
          .subtract(age.months, 'month')
          .toDate(),
      );
    }
  }, [age]);

  useEffect(() => {
    if (props.birthdateEstimatedValue) {
      props.onBirthdateChange(null);
    } else {
      setAge({ years: 0, months: 0 });
    }
  }, [props.birthdateEstimatedValue]);

  const getAgeInputs = () => {
    return (
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Estimated Age</h1>
        <label className={styles.fieldLabel} htmlFor="years">
          Years
        </label>
        <input
          type="number"
          id="years"
          name="years"
          aria-label="yearsInput"
          value={age.years}
          className={styles.fieldInput}
          onChange={event => setAge({ ...age, years: event.target.valueAsNumber })}
        />
        <label className={styles.fieldLabel} htmlFor="months">
          Months
        </label>
        <input
          type="number"
          id="months"
          name="months"
          aria-label="monthsInput"
          value={age.months}
          className={styles.fieldInput}
          onChange={event => setAge({ ...age, months: event.target.valueAsNumber })}
        />
      </section>
    );
  };

  return (
    <main>
      {props.birthdateEstimatedValue ? getAgeInputs() : null}
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Birth Date*</h1>
        <input
          type="date"
          name="birthdate"
          aria-label="birthdateInput"
          className={styles.fieldInput}
          disabled={props.birthdateEstimatedValue}
          value={props.birthdateValue !== null ? dayjs(props.birthdateValue).format('YYYY-MM-DD') : ''}
          max={dayjs(dayjs(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
          onChange={event => props.onBirthdateChange(event.target.valueAsDate)}
          required
        />
        <h1 className={styles.fieldHeader}>Birth Time</h1>
        <input
          type="time"
          name="birthtime"
          aria-label="birthtimeInput"
          className={styles.fieldInput}
          value={props.birthtimeValue !== null ? dayjs(props.birthtimeValue).format('HH:mm') : ''}
          onChange={event => props.onBirthtimeChange(event.target.valueAsDate)}
        />
        <h1 className={styles.fieldHeader}>Estimate</h1>
        <input
          type="checkbox"
          name="estimate"
          aria-label="estimateCheckbox"
          className={styles.fieldInput}
          checked={props.birthdateEstimatedValue}
          onChange={event => props.onBirthdateEstimatedChange(event.target.checked)}
        />
      </section>
    </main>
  );
}
