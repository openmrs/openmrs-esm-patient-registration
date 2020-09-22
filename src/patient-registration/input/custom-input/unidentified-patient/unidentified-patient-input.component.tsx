import React, { useEffect } from 'react';
import { useField } from 'formik';
import { Input } from '../../basic-input/input/input.component';

interface UnidentifiedPatientInputProps {
  name: string;
  setName(field: string, value: any, shouldValidate?: boolean): void;
}

export const UnidentifiedPatientInput: React.FC<UnidentifiedPatientInputProps> = ({ setName, name }) => {
  const [field] = useField({ name });

  useEffect(() => {
    if (field.value) {
      setName('givenName', 'UNKNOWN');
      setName('middleName', 'UNKNOWN');
      setName('familyName', 'UNKNOWN');
    }
  }, [field.value, setName]);

  return <Input type="checkbox" label="Unidentified Patient" name={name} />;
};
