import React from 'react';
import { AddressField } from '../field/address/address-field.component';
import { EmailField } from '../field/email/email-field.component';
import { PhoneField } from '../field/phone/phone-field.component';
import { NameField } from '../field/name/name-field.component';
import { GenderField } from '../field/gender/gender-field.component';
import { IdField } from '../field/id/id-field.component';

export const getField = (fieldName: string) => {
  switch (fieldName) {
    case 'address':
      return <AddressField />;
    case 'email':
      return <EmailField />;
    case 'phone':
      return <PhoneField />;
    case 'name':
      return <NameField />;
    case 'gender':
      return <GenderField />;
    case 'id':
      return <IdField />;
    case 'default':
      return <div>Unknown Field {fieldName} </div>;
  }
};
