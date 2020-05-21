import React, { useState, useEffect } from 'react';
import styles from './patient-name.css';

interface PatientNameProps {
  onPatientNameChange(patientName: PatientNameState): void;
}

interface PatientNameState {
  firstName: string;
  middleName: string;
  lastName: string;
  nameUnknown: boolean;
}

export function PatientName(props: PatientNameProps) {
  const [patientName, setPatientName] = useState<PatientNameState>({
    firstName: '',
    middleName: '',
    lastName: '',
    nameUnknown: false,
  });

  useEffect(() => {
    props.onPatientNameChange(patientName);
  }, [patientName]);

  useEffect(() => {
    if (patientName.nameUnknown) {
      setAllNames('');
    }
  }, [patientName.nameUnknown]);

  const setAllNames = (name: string) => {
    setPatientName({
      ...patientName,
      firstName: name,
      middleName: name,
      lastName: name,
    });
  };

  return (
    <main className={styles.container}>
      <section className={styles.item}>
        <div className="omrs-input-group">
          <input
            type="text"
            value={patientName.firstName}
            name="first_name"
            className="omrs-input-underlined"
            disabled={patientName.nameUnknown}
            onChange={event => setPatientName({ ...patientName, firstName: event.target.value })}
            required
          />
          <label htmlFor="first_name" className="omrs-margin-right-4 first_name">
            First Name
          </label>
        </div>
      </section>
      <section className={styles.item}>
        <div className="omrs-input-group">
          <input
            type="text"
            value={patientName.middleName}
            name="middle_name"
            className="omrs-input-underlined"
            disabled={patientName.nameUnknown}
            onChange={event => setPatientName({ ...patientName, middleName: event.target.value })}
          />
          <label htmlFor="middle_name" className="omrs-margin-right-4 middle_name">
            Middle Name
          </label>
        </div>
      </section>
      <section className={styles.item}>
        <div className="omrs-input-group">
          <input
            type="text"
            value={patientName.lastName}
            name="last_name"
            className="omrs-input-underlined"
            disabled={patientName.nameUnknown}
            onChange={event => setPatientName({ ...patientName, lastName: event.target.value })}
            required
          />
          <label htmlFor="last_name" className="omrs-margin-right-4 last_name">
            Last Name
          </label>
        </div>
      </section>
      <section className={styles.item}>
        <div className="omrs-checkbox">
          <label>
            <input
              type="checkbox"
              name="omrs-checkbox"
              checked={patientName.nameUnknown}
              onChange={event => setPatientName({ ...patientName, nameUnknown: event.target.checked })}
            />
            <span className="omrs-margin-left-4 name_unknown">Name Unknown</span>
          </label>
        </div>
      </section>
    </main>
  );
}
