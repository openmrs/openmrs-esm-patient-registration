import React from 'react';
import styles from './section.css';
import { PersonAttributeInput } from '../basic-input/person-attribute-input.component';

interface PersonAttributeSectionProps {
  label: string;
  placeholder: string;
  name: string;
}
export const PersonAttributeSection: React.FC<PersonAttributeSectionProps> = ({ label, placeholder, name }) => {
  return (
    <div>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">{label}</h3>
        <PersonAttributeInput label={label} placeholder={placeholder} name={name} />
      </section>
    </div>
  );
};
