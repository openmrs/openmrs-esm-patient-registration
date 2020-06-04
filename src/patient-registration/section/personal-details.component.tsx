import React, { useState, useEffect, FormEvent } from 'react';
import dayjs from 'dayjs';
import styles from './personal-details.css';

interface PersonalDetailsProps {
  onChange(personalDetails: PersonalDetailsState): void;
}

export interface PersonalDetailsState {
  givenName: string;
  middleName: string;
  familyName: string;
  nameUnknown: boolean;
  additionalGivenName: string;
  additionalMiddleName: string;
  additionalFamilyName: string;
  gender: string;
  birthDate: Date;
  birthTime: Date;
  estimate: boolean;
}

export function PersonalDetails(props: PersonalDetailsProps) {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsState>({
    givenName: '',
    middleName: '',
    familyName: '',
    nameUnknown: false,
    additionalGivenName: '',
    additionalMiddleName: '',
    additionalFamilyName: '',
    gender: '',
    birthDate: null,
    birthTime: null,
    estimate: false,
  });

  const [age, setAge] = useState<{ years: number; months: number }>({
    years: 0,
    months: 0,
  });

  useEffect(() => {
    props.onChange(personalDetails);
  }, [personalDetails]);

  useEffect(() => {
    if (personalDetails.nameUnknown) {
      setNames('');
    }
  }, [personalDetails.nameUnknown]);

  useEffect(() => {
    if (age.years !== 0 || age.months !== 0) {
      setPersonalDetails({
        ...personalDetails,
        birthDate: dayjs()
          .subtract(age.years, 'year')
          .subtract(age.months, 'month')
          .toDate(),
      });
    }
  }, [age]);

  useEffect(() => {
    if (personalDetails.estimate) {
      setPersonalDetails({ ...personalDetails, birthDate: null });
    } else {
      setAge({ years: 0, months: 0 });
    }
  }, [personalDetails.estimate]);

  const setNames = (name: string) => {
    setPersonalDetails({
      ...personalDetails,
      givenName: name,
      middleName: name,
      familyName: name,
      additionalGivenName: name,
      additionalMiddleName: name,
      additionalFamilyName: name,
    });
  };

  const getAgeInputs = () => {
    return (
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Age</h1>
        <section className={styles.column}>
          <label className={styles.fieldLabel} htmlFor="years">
            Years
          </label>
          <input
            type="number"
            id="years"
            name="years"
            value={age.years}
            className={styles.fieldInput}
            onChange={event => setAge({ ...age, years: event.target.valueAsNumber })}
          />
        </section>
        <section className={styles.column}>
          <label className={styles.fieldLabel} htmlFor="months">
            Months
          </label>
          <input
            type="number"
            id="months"
            name="months"
            value={age.months}
            className={styles.fieldInput}
            onChange={event => setAge({ ...age, months: event.target.valueAsNumber })}
          />
        </section>
      </section>
    );
  };

  return (
    <main className={styles.container}>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Name</h1>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Given Name"
            value={personalDetails.givenName}
            name="given-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, givenName: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Middle Name"
            value={personalDetails.middleName}
            name="middle-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, middleName: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Family Name"
            value={personalDetails.familyName}
            name="family-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, familyName: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Name Unknown</h1>
          <input
            type="checkbox"
            id="name-unknown"
            name="name-unknown"
            className={styles.fieldInput}
            checked={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, nameUnknown: event.target.checked })}
          />
        </section>
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Additional Name</h1>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Additional Given Name"
            value={personalDetails.additionalGivenName}
            name="additional-given-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, additionalGivenName: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Additional Middle Name"
            value={personalDetails.additionalMiddleName}
            name="additional-middle-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, additionalMiddleName: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Additional Family Name"
            value={personalDetails.additionalFamilyName}
            name="additional-family-name"
            className={styles.fieldInput}
            disabled={personalDetails.nameUnknown}
            onChange={event => setPersonalDetails({ ...personalDetails, additionalFamilyName: event.target.value })}
          />
        </section>
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Gender</h1>
        <select
          name="gender"
          className={styles.fieldInput}
          value={personalDetails.gender}
          onChange={event => setPersonalDetails({ ...personalDetails, gender: event.target.value })}>
          <option value="" disabled>
            Select
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="U">Unknown</option>
        </select>
      </section>
      {personalDetails.estimate ? getAgeInputs() : null}
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Birth Date</h1>
        <section className={styles.column}>
          <input
            type="date"
            id="birth-date"
            name="birth-date"
            className={styles.fieldInput}
            disabled={personalDetails.estimate}
            value={personalDetails.birthDate !== null ? dayjs(personalDetails.birthDate).format('YYYY-MM-DD') : ''}
            min={'0000-01-01'}
            max={'9999-12-31'}
            onChange={event => setPersonalDetails({ ...personalDetails, birthDate: event.target.valueAsDate })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Birth Time</h1>
          <input
            type="time"
            id="birth-time"
            name="birth-time"
            className={styles.fieldInput}
            value={personalDetails.birthTime !== null ? dayjs(personalDetails.birthTime).format('HH:mm') : ''}
            onChange={event => setPersonalDetails({ ...personalDetails, birthTime: event.target.valueAsDate })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Estimate</h1>
          <input
            type="checkbox"
            id="estimate"
            name="estimate"
            className={styles.fieldInput}
            checked={personalDetails.estimate}
            onChange={event => setPersonalDetails({ ...personalDetails, estimate: event.target.checked })}
          />
        </section>
      </section>
    </main>
  );
}
