import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './life-span.css';

require('moment-precise-range-plugin');

interface LifeSpanProps {}

export function LifeSpan(props: LifeSpanProps) {
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [age, setAge] = useState<{ years: number; months: number; days: number }>({ years: 0, months: 0, days: 0 });
  const [estimate, setEstimate] = useState<boolean>(false);

  useEffect(() => {
    let difference = moment()
      .subtract(age.years, 'years')
      .subtract(age.months, 'months')
      .subtract(age.days, 'days');
    setDateOfBirth(difference.toISOString().split('T')[0]);
  }, [age]);

  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dateOfBirth = moment(event.target.value, 'YYYY-MM-DD');
    let difference = moment().preciseDiff(dateOfBirth, true);

    setDateOfBirth(event.target.value);
    setAge({ years: difference.years, months: difference.months, days: difference.days });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge({ ...age, [event.target.name]: event.target.value });
  };

  return (
    <main className={styles.container}>
      <section className={styles.itemDateOfBirth}>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="date-of-birth"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
        />
      </section>
      <section className={styles.itemBirthTime}>
        <label htmlFor="birth-time">Birth Time</label>
        <input
          type="time"
          id="birth-time"
          name="birth-time"
          value={birthTime}
          onChange={event => setBirthTime(event.target.value)}
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
          value={age.years}
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
          value={age.months}
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
          value={age.days}
          onChange={handleAgeChange}
        />
      </section>
      <section className={styles.itemEstimate}>
        <label htmlFor="estimate">Estimate</label>
        <input
          type="checkbox"
          id="estimate"
          name="estimate"
          checked={estimate}
          onChange={event => setEstimate(event.target.checked)}
        />
      </section>
    </main>
  );
}
