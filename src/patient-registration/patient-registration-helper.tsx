import { NameValue } from './field/name/name.component';
import { AddressValue } from './field/address/address.component';

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
    birthtime: Date;
    addresses: Array<AddressValue>;
  };
};
