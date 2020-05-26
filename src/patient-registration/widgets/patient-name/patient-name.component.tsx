import React, { useState, useEffect } from 'react';
import styles from './patient-name.css';

interface PatientNameProps {
  onChange(patientName: PatientNameState): void;
}

interface PatientNameState {
  firstName: string;
  middleName: string;
  lastName: string;
  nameUnknown: boolean;
  additionalFirstName: string;
  additionalMiddleName: string;
  additionalLastName: string;
}

export function PatientName(props: PatientNameProps) {
  const [patientName, setPatientName] = useState<PatientNameState>({
    firstName: '',
    middleName: '',
    lastName: '',
    nameUnknown: false,
    additionalFirstName: '',
    additionalMiddleName: '',
    additionalLastName: '',
  });

  useEffect(() => {
    props.onChange(patientName);
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
      additionalFirstName: name,
      additionalMiddleName: name,
      additionalLastName: name,
    });
  };

  const requiredField = () => {
    return <span className={styles.required}>*</span>;
  };

  return (
    <main className={styles.container}>
      <section className={styles.item}>
        <div className={styles.subItem}>
          <label htmlFor="patient-name">Patient Name {requiredField()}</label>
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
        </div>
        <div className={styles.subItem}>
          <label htmlFor="name-unknown">Name Unknown</label>
          <input
            type="checkbox"
            id="name-unknown"
            name="name-unknown"
            checked={patientName.nameUnknown}
            onChange={event => setPatientName({ ...patientName, nameUnknown: event.target.checked })}
          />
        </div>
      </section>
      <section className={styles.item}>
        <label htmlFor="additional-name">Additional Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={patientName.additionalFirstName}
          name="additional-first-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, additionalFirstName: event.target.value })}
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={patientName.additionalMiddleName}
          name="additional-middle-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, additionalMiddleName: event.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={patientName.additionalLastName}
          name="additional-last-name"
          disabled={patientName.nameUnknown}
          onChange={event => setPatientName({ ...patientName, additionalLastName: event.target.value })}
        />
      </section>
    </main>
  );
}
