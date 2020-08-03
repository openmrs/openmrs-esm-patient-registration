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

export type Relationships = { uuid: string; name: string; type: string };
export type tempRelationship = { personA: string; relationshipType: string; personB: string };
export type Patient = {
  identifiers: [
    {
      identifier: string;
      identifierType: string;
      location: string;
    },
  ];
  person: {
    names: Array<NameValue>;
    gender: string;
    birthdate: Date;
    birthdateEstimated: boolean;
    attributes: Array<AttributeValue>;
    addresses: Array<AddressValue>;
  };
};
