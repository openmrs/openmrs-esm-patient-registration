import React from 'react';

type PatientRegistrationContextProps = {
  identifierTypes: Array<any>;
  values: any;
  validationSchema: any;
  setValidationSchema: Function;
  inEditMode: boolean;
  fieldConfigs: any;
};

export const PatientRegistrationContext = React.createContext<PatientRegistrationContextProps | undefined>(undefined);

export const useFieldConfig = field => {
  const { fieldConfigs } = React.useContext(PatientRegistrationContext);
  return fieldConfigs[field];
};
