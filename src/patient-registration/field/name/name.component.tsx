import React, { useEffect } from 'react';
import styles from './../field.css';

interface NameProps {
  fieldName: string;
  nameValue: { preferred: boolean; givenName: string; middleName: string; familyName: string };
  unknownValue: boolean;
  onNameChange(name: { preferred: boolean; givenName: string; middleName: string; familyName: string }): void;
  onUnknownChange(unknown: boolean): void;
}

export function Name(props: NameProps) {
  useEffect(() => {
    let defaultName = props.unknownValue ? 'UNKNOWN' : '';
    props.onNameChange({
      ...props.nameValue,
      givenName: defaultName,
      middleName: defaultName,
      familyName: defaultName,
    });
  }, [props.unknownValue]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onNameChange({ ...props.nameValue, [event.target.name]: event.target.value });
  };

  const getUnknownInput = () => {
    return (
      <section className={styles.optionalField}>
        <h1 className={styles.fieldHeader}>Unknown</h1>
        <input
          type="checkbox"
          id="unknown"
          name="unknown"
          className={styles.fieldInput}
          checked={props.unknownValue}
          onChange={event => props.onUnknownChange(event.target.checked)}
        />
      </section>
    );
  };

  return (
    <main className={styles.row}>
      <h1 className={styles.fieldHeader}>{props.fieldName}</h1>
      <input
        type="text"
        placeholder="Given Name"
        value={props.nameValue.givenName}
        name="givenName"
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={props.nameValue.middleName}
        name="middleName"
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Family Name"
        value={props.nameValue.familyName}
        name="familyName"
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      {props.nameValue.preferred ? getUnknownInput() : null}
    </main>
  );
}
