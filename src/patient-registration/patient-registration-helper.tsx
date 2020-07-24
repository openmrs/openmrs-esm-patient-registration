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

interface ContactPerson {
  names: Array<NameValue>;
  phoneNumber: string;
  relationship: string;
}

interface AttributeValue {
  attributeType: string;
  value: string;
}

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
    contactPerson?: ContactPerson;
  };
};
