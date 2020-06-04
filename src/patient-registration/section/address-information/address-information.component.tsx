import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './address-information.css';

interface AddressInformationProps {
  onChange(addressInformation: AddressInformationState): void;
}

export interface AddressInformationState {
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

export function AddressInformation(props: AddressInformationProps) {
  const [addressInformation, setAddressInformation] = useState<AddressInformationState>({
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    latitude: '',
    longitude: '',
    startDate: null,
    endDate: null,
  });

  const [test, setTest] = useState<string>('');

  useEffect(() => {
    props.onChange(addressInformation);
  }, [addressInformation]);

  const textInputField = (name: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (
      <input
        className={styles.fieldInput}
        type="text"
        value={name}
        name={name}
        onChange={event => setter(event.target.value)}
      />
    );
  };

  return (
    <main className={styles.container}>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Address 1</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={addressInformation.address1}
          name="address1"
          onChange={event => setAddressInformation({ ...addressInformation, address1: event.target.value })}
        />
      </section>
      <section className={styles.row}>
        <h1 className={styles.fieldHeader}>Address 2</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={addressInformation.address2}
          name="address2"
          onChange={event => setAddressInformation({ ...addressInformation, address2: event.target.value })}
        />
      </section>
      <section className={styles.row}>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>City/Village</h1>
          <input
            className={styles.fieldInput}
            type="text"
            value={addressInformation.cityVillage}
            name="cityVillage"
            onChange={event => setAddressInformation({ ...addressInformation, cityVillage: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>State/Province</h1>
          <input
            className={styles.fieldInput}
            type="text"
            value={addressInformation.stateProvince}
            name="stateProvince"
            onChange={event => setAddressInformation({ ...addressInformation, stateProvince: event.target.value })}
          />
        </section>
      </section>
      <section className={styles.column}>
        <h1 className={styles.fieldHeader}>Postal Code</h1>
        <input
          className={styles.fieldInput}
          type="text"
          value={addressInformation.postalCode}
          name="postalCode"
          onChange={event => setAddressInformation({ ...addressInformation, postalCode: event.target.value })}
        />
      </section>
      <section className={styles.row}>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Country</h1>
          <input
            className={styles.fieldInput}
            type="text"
            value={addressInformation.country}
            name="country"
            onChange={event => setAddressInformation({ ...addressInformation, country: event.target.value })}
          />
        </section>
      </section>
      <section className={styles.row}>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Latitude</h1>
          <input
            className={styles.fieldInput}
            type="string"
            value={addressInformation.latitude !== null ? addressInformation.latitude : ''}
            name="latitude"
            onChange={event => setAddressInformation({ ...addressInformation, latitude: event.target.value })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Longitude</h1>
          <input
            className={styles.fieldInput}
            type="string"
            value={addressInformation.longitude !== null ? addressInformation.longitude : ''}
            name="longitude"
            onChange={event => setAddressInformation({ ...addressInformation, longitude: event.target.value })}
          />
        </section>
      </section>
      <section className={styles.row}>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>Start Date</h1>
          <input
            className={styles.fieldInput}
            type="date"
            value={
              addressInformation.startDate !== null ? dayjs(addressInformation.startDate).format('YYYY-MM-DD') : ''
            }
            name="startDate"
            onChange={event => setAddressInformation({ ...addressInformation, startDate: event.target.valueAsDate })}
          />
        </section>
        <section className={styles.column}>
          <h1 className={styles.fieldHeader}>End Date</h1>
          <input
            className={styles.fieldInput}
            type="date"
            value={addressInformation.endDate !== null ? dayjs(addressInformation.endDate).format('YYYY-MM-DD') : ''}
            name="endDate"
            onChange={event => setAddressInformation({ ...addressInformation, endDate: event.target.valueAsDate })}
          />
        </section>
      </section>
    </main>
  );
}
