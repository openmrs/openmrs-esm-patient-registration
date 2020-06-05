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
        preferred: boolean;
        givenName: string;
        middleName: string;
        familyName: string;
      },
      {
        preferred: boolean;
        givenName: string;
        middleName: string;
        familyName: string;
      },
    ];
    gender: string;
    birthdate: Date;
    birthdateEstimated: boolean;
    birthtime: Date;
  };
};
