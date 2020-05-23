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
        <label htmlFor="patient-name">Patient Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={patientName.firstName}
          name="first-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, firstName: event.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={patientName.middleName}
          name="middle-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, middleName: event.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={patientName.lastName}
          name="last-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, lastName: event.target.value })}
          required
        />
      </section>
      <section className={styles.item}>
        <label htmlFor="name-unknown">Name Unknown</label>
        <input
          type="checkbox"
          id="name-unknown"
          name="name-unknown"
          checked={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, nameUnknown: event.target.checked })}
        />
      </section>
    </main>
  );
}
