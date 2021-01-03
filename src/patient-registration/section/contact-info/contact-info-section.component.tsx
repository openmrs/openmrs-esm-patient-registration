import React from 'react';
import { getField } from '../section-helper';

interface ContactInfoSectionProps {
  fields: Array<string>;
  fieldConfigs: Array<any>;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ fields, fieldConfigs }) => {
  return (
    <section aria-label="Contact Info Section">
      {fields.map(fieldName => (
        <div key={fieldName}>{getField(fieldName, fieldConfigs)}</div>
      ))}
    </section>
  );
};
