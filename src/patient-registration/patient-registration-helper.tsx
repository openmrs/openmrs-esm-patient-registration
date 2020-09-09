interface NameValue {
  preferred: boolean;
  givenName: string;
  middleName: string;
  familyName: string;
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
  identifierSources: Array<IdentifierSource>;
  autoGenerationSource: IdentifierSource;
  isPrimary: boolean;
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
    addresses: Array<Record<string, string>>;
  };
};

export interface IdentifierSource {
  uuid: string;
  name: string;
  autoGenerationOption: {
    manualEntryEnabled: boolean;
    automaticGenerationEnabled: boolean;
  };
}
