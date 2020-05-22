import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './life-span.css';

require('moment-precise-range-plugin');

interface LifeSpanProps {
  onLifeSpanChange(lifeSpan: LifeSpanState): void;
}

interface LifeSpanState {
  dateOfBirth: string;
  birthTime: string;
  age: { years: number; months: number; days: number };
  estimate: boolean;
}

export function LifeSpan(props: LifeSpanProps) {
  const [patientLifeSpan, setPatientLifeSpan] = useState<LifeSpanState>({
    dateOfBirth: '',
    birthTime: '',
    age: { years: 0, months: 0, days: 0 },
    estimate: false,
  });

  useEffect(() => {
    props.onLifeSpanChange(patientLifeSpan);
  }, [patientLifeSpan]);

  useEffect(() => {
    let difference = moment()
      .subtract(patientLifeSpan.age.years, 'years')
      .subtract(patientLifeSpan.age.months, 'months')
      .subtract(patientLifeSpan.age.days, 'days');

    setPatientLifeSpan({
      ...patientLifeSpan,
      dateOfBirth: difference.toISOString().split('T')[0],
    });
  }, [patientLifeSpan.age]);

  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dateOfBirth = moment(event.target.value, 'YYYY-MM-DD');
    let difference = moment().preciseDiff(dateOfBirth, true);

    setPatientLifeSpan({
      ...patientLifeSpan,
      dateOfBirth: event.target.value,
      age: { years: difference.years, months: difference.months, days: difference.days },
    });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatientLifeSpan({
      ...patientLifeSpan,
      age: { ...patientLifeSpan.age, [event.target.name]: event.target.value },
    });
  };

  return (
    <main className={styles.container}>
      <section className={styles.itemDateOfBirth}>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="date-of-birth"
          value={patientLifeSpan.dateOfBirth}
          onChange={handleDateOfBirthChange}
        />
      </section>
      <section className={styles.itemBirthTime}>
        <label htmlFor="birth-time">Birth Time</label>
        <input
          type="time"
          id="birth-time"
          name="birth-time"
          value={patientLifeSpan.birthTime}
          onChange={event => setPatientLifeSpan({ ...patientLifeSpan, birthTime: event.target.value })}
        />
      </section>
      <section className={styles.itemAge}>
        <label htmlFor="age">Age</label>
        <label className={styles.ageLabel} htmlFor="years">
          Years
        </label>
        <input
          className={styles.ageInput}
          type="number"
          id="years"
          name="years"
          value={patientLifeSpan.age.years}
          onChange={handleAgeChange}
        />
        <label className={styles.ageLabel} htmlFor="months">
          Months
        </label>
        <input
          className={styles.ageInput}
          type="number"
          id="months"
          name="months"
          value={patientLifeSpan.age.months}
          onChange={handleAgeChange}
        />
        <label className={styles.ageLabel} htmlFor="days">
          Days
        </label>
        <input
          className={styles.ageInput}
          type="number"
          id="days"
          name="days"
          value={patientLifeSpan.age.days}
          onChange={handleAgeChange}
        />
      </section>
      <section className={styles.itemEstimate}>
        <label htmlFor="estimate">Estimate</label>
        <input
          type="checkbox"
          id="estimate"
          name="estimate"
          checked={patientLifeSpan.estimate}
          onChange={event => setPatientLifeSpan({ ...patientLifeSpan, estimate: event.target.checked })}
        />
      </section>
    </main>
  );
}
