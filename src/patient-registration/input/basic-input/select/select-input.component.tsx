import React from 'react';
import { useField } from 'formik';
import styles from './../../input.scss';
import { Select, SelectItem } from 'carbon-components-react';

interface SelectInputProps {
  name: string;
  options: Array<string>;
  label: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, options, label }) => {
  const [field, meta] = useField(name);
  const selectOptions = [
    <SelectItem disabled hidden text={`Select ${label}`} key="" value="" />,
    ...options.map(currentOption => <SelectItem text={currentOption} value={currentOption} key="" />),
  ];

  return (
    <div>
      <Select id="identifier" {...field} labelText={label} light>
        {selectOptions}
      </Select>
    </div>
  );
};
