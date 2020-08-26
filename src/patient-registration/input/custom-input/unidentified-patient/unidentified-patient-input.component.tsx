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
    let newName = field.value ? 'UNKNOWN' : '';

    setName('givenName', newName);
    setName('middleName', newName);
    setName('familyName', newName);
  }, [field.value, setName]);

  return <Input type="checkbox" label="Unidentified Patient" name={name} />;
};
