interface NameValue {
  uuid: string;
  preferred: boolean;
  givenName: string;
  middleName: string;
  familyName: string;
}

export interface AttributeValue {
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
  uuid: string;
  identifier: string;
  identifierType: string;
  location: string;
  preferred: boolean;
}

export type Relationship = {
  relationshipType: string;
  personA: string;
  personB: string;
};

export type Patient = {
  uuid: string;
  identifiers: Array<PatientIdentifier>;
  person: {
    uuid: string;
    names: Array<NameValue>;
    gender: string;
    birthdate: string;
    birthdateEstimated: boolean;
    attributes: Array<AttributeValue>;
    addresses: Array<Record<string, string>>;
    dead: boolean;
    deathDate?: string;
    causeOfDeath?: string;
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

export interface FormValues {
  givenName: string;
  middleName: string;
  familyName: string;
  unidentifiedPatient: boolean;
  additionalGivenName: string;
  additionalMiddleName: string;
  additionalFamilyName: string;
  addNameInLocalLanguage: boolean;
  gender: string;
  birthdate: string;
  yearsEstimated: number;
  monthsEstimated: number;
  birthdateEstimated: boolean;
  telephoneNumber: string;
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  isDead: boolean;
  deathDate: string;
  deathCause: string;
  relationships: Array<{ relatedPerson: string; relationship: string }>;
}

export interface PatientUuidMapType {
  additionalNameUuid: string | undefined;
  patientUuid: string | undefined;
  preferredNameUuid: string | undefined;
}
