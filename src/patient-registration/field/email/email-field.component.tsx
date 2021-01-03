import React from 'react';
import styles from '../field.scss';
import { Input } from '../../input/basic-input/input/input.component';

export const EmailField: React.FC = () => {
  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>Email</h4>
      <Input id="email" name="email" labelText="Email" light={true} />
    </div>
  );
};
