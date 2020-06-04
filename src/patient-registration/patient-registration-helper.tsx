export type Patient = {
  identifiers: [
    {
      identifier: string;
      identifierType: string;
      location: string;
    },
  ];
  person: {
    names: [
      {
        givenName: string;
        middleName: string;
        familyName: string;
      },
    ];
    gender: string;
    birthdate: Date;
    birthdateEstimated: boolean;
    birthtime: Date;
    addresses: [
      {
        address1: string;
        address2: string;
        cityVillage: string;
        stateProvince: string;
        postalCode: string;
        country: string;
        latitude: string;
        longitude: string;
        startDate: Date;
        endDate: Date;
      },
    ];
  };
};
