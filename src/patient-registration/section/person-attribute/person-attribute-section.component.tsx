import React from 'react';
import styles from './section.css';
import { TextInput } from '../../input/basic-input/text/text-input.component';

interface PersonAttributeSectionProps {
  label: string;
  placeholder: string;
  name: string;
}
export const PersonAttributeSection: React.FC<PersonAttributeSectionProps> = ({ label, placeholder, name }) => {
  return (
    <section className={styles.formGroup}>
      <TextInput label={label} placeholder={placeholder} name={name} showLabel={true} />
    </section>
  );
};
