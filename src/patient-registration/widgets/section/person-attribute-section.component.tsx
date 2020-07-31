import React from 'react';
import styles from './section.css';
import { PersonAttributeInput } from '../basic-input/person-attribute-input.component';

interface PersonAttributeSectionProps {
  title: string;
  subTitle: string;
  label: string;
  placeholder: string;
  name: string;
  id: string;
}
export const PersonAttributeSection: React.FC<PersonAttributeSectionProps> = ({
  title,
  subTitle,
  label,
  placeholder,
  name,
  id,
}) => {
  return (
    <div>
      <section className={styles.formGroup}>
        <h3 className="omrs-type-title-5">{subTitle}</h3>
        <PersonAttributeInput id={id} label={label} placeholder={placeholder} name={name} />
      </section>
    </div>
  );
};
