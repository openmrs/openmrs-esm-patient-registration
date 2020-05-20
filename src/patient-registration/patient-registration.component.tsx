import React, { useState } from 'react';
import { LifeSpan } from './widgets/life-span/life-span.component';
import PatientName from './widgets/patient-name/patient-name.component';
import styles from './patient-registration.css';

interface PatientRegistrationProps {}

export function PatientRegistration(props: PatientRegistrationProps) {
  const [nameUnknown, setNameUnknown] = useState<boolean>(false);

  return (
    <form className={`omrs-margin-8 omrs-padding-8 ${styles.dashboard}`}>
      <h1 className="omrs-type-title-1">New Patient</h1>
      <section className={styles.widget}>
        <PatientName setNameUnknown={setNameUnknown} />
      </section>
      <section className={styles.widget}>
        <LifeSpan />
      </section>
    </form>
  );
}
