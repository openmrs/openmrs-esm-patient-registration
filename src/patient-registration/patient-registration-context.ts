import React from 'react';

type PatientRegistrationContextProps = {
  identifierTypes: Array<any>;
  values: any;
  validationSchema: any;
  setValidationSchema: (value: any) => void;
  inEditMode: boolean;
  fieldConfigs: any;
  setFieldValue: Function;
};

export const PatientRegistrationContext = React.createContext<PatientRegistrationContextProps | undefined>(undefined);

export const useFieldConfig = field => {
  const { fieldConfigs } = React.useContext(PatientRegistrationContext);
  return fieldConfigs[field];
};
