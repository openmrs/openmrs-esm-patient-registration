import React from 'react';
import styles from '../field.scss';
import { Input } from '../../input/basic-input/input/input.component';

export const PhoneField: React.FC = () => {
  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>Phone</h4>
      <Input id="phone" name="phone" labelText="Phone number(optional)" light={true} />
    </div>
  );
};
