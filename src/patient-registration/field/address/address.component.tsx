import React from 'react';
import dayjs from 'dayjs';
import styles from './../field.css';

export interface AddressValue {
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  startDate: Date;
  endDate: Date;
}

interface AddressProps {
  value: AddressValue;
  onChange(value: AddressValue): void;
}

export function Address(props: AddressProps) {
  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.value, [event.target.name]: event.target.value });
  };

  return (
    <main>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Address 1</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.address1}
          name="address1"
          aria-label="address1Input"
          onChange={handleTextInputChange}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Address 2</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.address2}
          name="address2"
          aria-label="address2Input"
          onChange={handleTextInputChange}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>City/Village</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.cityVillage}
          name="cityVillage"
          aria-label="cityVillageInput"
          onChange={handleTextInputChange}
        />
        <h1 className={styles.fieldHeader}>State/Province</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.stateProvince}
          name="stateProvince"
          aria-label="stateProvinceInput"
          onChange={handleTextInputChange}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Postal Code</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.postalCode}
          name="postalCode"
          aria-label="postalCodeInput"
          onChange={handleTextInputChange}
        />
        <h1 className={styles.fieldHeader}>Country</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.country}
          name="country"
          aria-label="countryInput"
          onChange={handleTextInputChange}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Latitude</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.latitude !== null ? props.value.latitude : ''}
          name="latitude"
          aria-label="latitudeInput"
          onChange={handleTextInputChange}
        />
        <h1 className={styles.fieldHeader}>Longitude</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={props.value.longitude !== null ? props.value.longitude : ''}
          name="longitude"
          aria-label="longitudeInput"
          onChange={handleTextInputChange}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Start Date</h1>
        <input
          className={styles.fieldInput}
          type="date"
          value={props.value.startDate !== null ? dayjs(props.value.startDate).format('YYYY-MM-DD') : ''}
          name="startDate"
          aria-label="startDateInput"
          onChange={event => props.onChange({ ...props.value, startDate: event.target.valueAsDate })}
        />
        <h1 className={styles.fieldHeader}>End Date</h1>
        <input
          className={styles.fieldInput}
          type="date"
          value={props.value.endDate !== null ? dayjs(props.value.endDate).format('YYYY-MM-DD') : ''}
          name="endDate"
          aria-label="endDateInput"
          onChange={event => props.onChange({ ...props.value, endDate: event.target.valueAsDate })}
        />
      </section>
    </main>
  );
}
