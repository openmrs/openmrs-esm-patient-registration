import React, { useState, useEffect } from 'react';
import styles from './address-information.css';

interface AddressInformationProps {
  onChange(addressInformation: AddressInformationState): void;
}

export interface AddressInformationState {}

export function AddressInformation(props: AddressInformationProps) {
  const [addressInformation, setAddressInformation] = useState<AddressInformationState>({});

  useEffect(() => {
    props.onChange(addressInformation);
  }, [addressInformation]);

  return <main className={styles.container}></main>;
}
