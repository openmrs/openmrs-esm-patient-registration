import React from 'react';
import styles from './../input.css';
import { TextInput } from '../basic-input/text/text-input.component';

interface IndentifierInputProps {
  name: string;
  label: string;
}

export const IdentifierInput: React.FC<IndentifierInputProps> = ({ name, label }) => {
  return (
    <div className={styles.fieldRow}>
      <TextInput showLabel={false} label="" placeholder={label} name={name} />
    </div>
  );
};
