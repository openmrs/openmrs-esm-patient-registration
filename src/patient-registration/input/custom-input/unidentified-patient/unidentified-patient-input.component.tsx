import React, { useEffect } from 'react';
import { useField } from 'formik';
import { CheckboxInput } from '../../basic-input/checkbox/checkbox-input.component';

interface UnidentifiedPatientInputProps {
  label: string;
  name: string;
  setName(field: string, value: any, shouldValidate?: boolean): void;
}

export const UnidentifiedPatientInput: React.FC<UnidentifiedPatientInputProps> = ({ label, name, setName }) => {
  const [field] = useField({ name });

  useEffect(() => {
    let name = field.value ? 'UNKNOWN' : '';

    setName('givenName', name);
    setName('middleName', name);
    setName('familyName', name);
  }, [field.value, setName]);

  return <CheckboxInput label={label} name={name} />;
};
