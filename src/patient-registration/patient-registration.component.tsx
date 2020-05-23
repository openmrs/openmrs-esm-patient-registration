import React, { useState, useEffect } from 'react';
import { PatientName } from './widgets/patient-name/patient-name.component';
import { LifeSpan } from './widgets/life-span/life-span.component';
import styles from './patient-registration.css';

interface PatientRegistrationProps {}

export function PatientRegistration(props: PatientRegistrationProps) {
  const [patientName, setPatientName] = useState(null);
  const [lifeSpan, setLifeSpan] = useState(null);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.dashboard}>
      <h1 className={styles.title}>New Patient</h1>
      <section className={styles.demographics}>
        <div className={styles.widget}>
          <PatientName onPatientNameChange={setPatientName} />
        </div>
        <div className={styles.widget}>
          <LifeSpan onLifeSpanChange={setLifeSpan} />
        </div>
      </section>
      <section className={styles.submit}>
        <button id="save" type="submit" className={styles.save}>
          Save
        </button>
      </section>
    </form>
  );
}
