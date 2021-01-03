import React from 'react';
import styles from '../patient-registration.scss';
import { Tile } from 'carbon-components-react';

export const SectionWrapper = ({ id, children, name, index }) => (
  <div id={id} style={{ marginTop: '2rem' }}>
    <h3 className={styles.productiveHeading02} style={{ color: '#161616' }}>
      {index + 1}. {name}
    </h3>
    <span className={styles.label01}>All fields are required unless marked optional</span>
    <div style={{ margin: '1rem 0 1rem' }}>
      <Tile>{children}</Tile>
    </div>
  </div>
);
