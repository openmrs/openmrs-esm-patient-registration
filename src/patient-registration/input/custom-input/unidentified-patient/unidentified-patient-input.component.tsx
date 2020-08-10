import React, { useEffect } from 'react';
import { useField } from 'formik';
import { CheckboxInput } from '../../basic-input/checkbox/checkbox-input.component';

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

  return <CheckboxInput label="Unidentified Patient" name={name} />;
};
