import React from 'react';
import styles from './../field.css';

interface NameProps {
  fieldName: string;
  value: { preferred: boolean; givenName: string; middleName: string; familyName: string };
  onChange(name: { preferred: boolean; givenName: string; middleName: string; familyName: string }): void;
}

export function Name(props: NameProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.value, [event.target.name]: event.target.value });
  };

  return (
    <main className={styles.container}>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>{props.fieldName}</h1>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Given Name"
            value={props.value.givenName}
            name="givenName"
            className={styles.fieldInput}
            onChange={handleNameChange}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Middle Name"
            value={props.value.middleName}
            name="middleName"
            className={styles.fieldInput}
            onChange={handleNameChange}
          />
        </section>
        <section className={styles.column}>
          <input
            type="text"
            placeholder="Family Name"
            value={props.value.familyName}
            name="familyName"
            className={styles.fieldInput}
            onChange={handleNameChange}
          />
        </section>
      </section>
    </main>
  );
}
