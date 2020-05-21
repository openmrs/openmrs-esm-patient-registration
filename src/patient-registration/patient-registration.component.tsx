import React, { useState } from 'react';
import { LifeSpan } from './widgets/life-span/life-span.component';
import PatientName from './widgets/patient-name/patient-name.component';
import styles from './patient-registration.css';

interface PatientRegistrationProps {}

export function PatientRegistration(props: PatientRegistrationProps) {
  const [nameUnknown, setNameUnknown] = useState<boolean>(false);
  const [lifeSpan, setLifeSpan] = useState(null);

  return (
    <form className={styles.dashboard}>
      <h1 className={styles.title}>New Patient</h1>
      <section className={styles.widget}>
        <PatientName setNameUnknown={setNameUnknown} />
      </section>
      <section className={styles.widget}>
        <LifeSpan onLifeSpanChange={setLifeSpan} />
      </section>
      <button className={styles.save}>Save</button>
    </form>
  );
}
