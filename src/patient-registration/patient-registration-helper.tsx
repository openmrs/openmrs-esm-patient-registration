interface NameValue {
  preferred: boolean;
  givenName: string;
  middleName: string;
  familyName: string;
}

interface AddressValue {
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

interface AttributeValue {
  attributeType: string;
  value: string;
}

export interface PatientIdentifierType {
  name: string;
  required: boolean;
  uuid: string;
  fieldName: string;
  format: string;
}

export interface PatientIdentifier {
  identifier: string;
  identifierType: string;
  location: string;
}

export type Patient = {
  identifiers: Array<PatientIdentifier>;
  person: {
    names: Array<NameValue>;
    gender: string;
    birthdate: Date;
    birthdateEstimated: boolean;
    attributes: Array<AttributeValue>;
    addresses: Array<AddressValue>;
  };
};
