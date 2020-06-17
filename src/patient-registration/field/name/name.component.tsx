import React, { useEffect } from 'react';
import styles from './../field.css';

export interface NameValue {
  preferred: boolean;
  givenName: string;
  middleName: string;
  familyName: string;
}

interface NameProps {
  fieldName: string;
  nameValue: NameValue;
  unknownValue: boolean;
  onNameChange(name: NameValue): void;
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
          aria-label="unknownCheckbox"
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
        placeholder={props.nameValue.preferred ? 'Given Name' : 'Additional Given Name'}
        value={props.nameValue.givenName}
        name="givenName"
        aria-label={props.nameValue.preferred ? 'givenNameInput' : 'additionalGivenNameInput'}
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder={props.nameValue.preferred ? 'Middle Name' : 'Additional Middle Name'}
        value={props.nameValue.middleName}
        name="middleName"
        aria-label={props.nameValue.preferred ? 'middleNameInput' : 'additionalMiddleNameInput'}
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder={props.nameValue.preferred ? 'Family Name' : 'Additional Family Name'}
        value={props.nameValue.familyName}
        name="familyName"
        aria-label={props.nameValue.preferred ? 'familyNameInput' : 'additionalFamilyNameInput'}
        disabled={props.unknownValue}
        className={styles.fieldInput}
        onChange={handleNameChange}
      />
      {props.nameValue.preferred ? getUnknownInput() : null}
    </main>
  );
}
