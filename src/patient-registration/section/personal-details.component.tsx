import React, { useState, useEffect } from 'react';
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
  age: { years: number; months: number; days: number };
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
    age: { years: 0, months: 0, days: 0 },
    estimate: false,
  });

  useEffect(() => {
    props.onChange(personalDetails);
  }, [personalDetails]);

  useEffect(() => {
    if (personalDetails.nameUnknown) {
      setNames('');
    }
  }, [personalDetails.nameUnknown]);

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

  return (
    <main className={styles.container}>
      <section className={styles.headers}>
        <div className={styles.header}>
          <h1 className={styles.fieldHeader}>Name</h1>
        </div>
        <div className={styles.header}>
          <h1 className={styles.fieldHeader}>Additional Name</h1>
        </div>
        <div className={styles.header}>
          <h1 className={styles.fieldHeader}>Gender</h1>
        </div>
        <div className={styles.header}>
          <h1 className={styles.fieldHeader}>Age</h1>
        </div>
        <div className={styles.header}>
          <h1 className={styles.fieldHeader}>Birth Date</h1>
        </div>
      </section>
      <section className={styles.inputs}>
        <div className={styles.input}>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Given Name"
              value={personalDetails.givenName}
              name="given-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, givenName: event.target.value })}
            />
          </div>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Middle Name"
              value={personalDetails.middleName}
              name="middle-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, middleName: event.target.value })}
            />
          </div>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Family Name"
              value={personalDetails.familyName}
              name="family-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, familyName: event.target.value })}
            />
          </div>
          <div className={styles.subInput}>
            <label htmlFor="name-unknown">Name Unknown</label>
            <input
              type="checkbox"
              id="name-unknown"
              name="name-unknown"
              checked={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, nameUnknown: event.target.checked })}
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Additional Given Name"
              value={personalDetails.additionalGivenName}
              name="additional-given-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, additionalGivenName: event.target.value })}
            />
          </div>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Additional Middle Name"
              value={personalDetails.additionalMiddleName}
              name="additional-middle-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, additionalMiddleName: event.target.value })}
            />
          </div>
          <div className={styles.subInput}>
            <input
              type="text"
              placeholder="Additional Family Name"
              value={personalDetails.additionalFamilyName}
              name="additional-family-name"
              disabled={personalDetails.nameUnknown}
              onChange={event => setPersonalDetails({ ...personalDetails, additionalFamilyName: event.target.value })}
            />
          </div>
        </div>
        <div className={styles.input}>
          <select
            value={personalDetails.gender}
            onChange={event => setPersonalDetails({ ...personalDetails, gender: event.target.value })}>
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.input}>
          <div className={styles.subInput}>
            <label className={styles.fieldSubLabel} htmlFor="years">
              Years
            </label>
            <input
              type="number"
              id="years"
              name="years"
              value={personalDetails.age.years}
              onChange={event =>
                setPersonalDetails({
                  ...personalDetails,
                  age: { ...personalDetails.age, years: event.target.valueAsNumber },
                })
              }
            />
          </div>
          <div className={styles.subInput}>
            <label className={styles.fieldSubLabel} htmlFor="months">
              Months
            </label>
            <input
              type="number"
              id="months"
              name="months"
              value={personalDetails.age.months}
              onChange={event =>
                setPersonalDetails({
                  ...personalDetails,
                  age: { ...personalDetails.age, months: event.target.valueAsNumber },
                })
              }
            />
          </div>
          <div className={styles.subInput}>
            <label className={styles.fieldSubLabel} htmlFor="days">
              Days
            </label>
            <input
              type="number"
              id="days"
              name="days"
              value={personalDetails.age.days}
              onChange={event =>
                setPersonalDetails({
                  ...personalDetails,
                  age: { ...personalDetails.age, days: event.target.valueAsNumber },
                })
              }
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.subInput}>
            <input
              type="date"
              id="birth-date"
              name="birth-date"
              value={personalDetails.birthDate !== null ? dayjs(personalDetails.birthDate).format('YYYY-MM-DD') : ''}
              min={'0000-01-01'}
              max={'9999-12-31'}
              onChange={event => setPersonalDetails({ ...personalDetails, birthDate: event.target.valueAsDate })}
            />
          </div>
          <div className={styles.subInput}>
            <label className={styles.fieldLabel} htmlFor="birth-time">
              Birth Time
            </label>
            <input
              type="time"
              id="birth-time"
              name="birth-time"
              value={personalDetails.birthTime !== null ? dayjs(personalDetails.birthTime).format('HH:mm') : ''}
              onChange={event => setPersonalDetails({ ...personalDetails, birthTime: event.target.valueAsDate })}
            />
          </div>
          <div className={styles.subInput}>
            <label className={styles.fieldLabel} htmlFor="estimate">
              Estimate
            </label>
            <input
              type="checkbox"
              id="estimate"
              name="estimate"
              checked={personalDetails.estimate}
              onChange={event => setPersonalDetails({ ...personalDetails, estimate: event.target.checked })}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
