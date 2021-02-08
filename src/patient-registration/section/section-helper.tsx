import React from 'react';
import { AddressField } from '../field/address/address-field.component';
import { EmailField } from '../field/email/email-field.component';
import { PhoneField } from '../field/phone/phone-field.component';
import { NameField } from '../field/name/name-field.component';
import { GenderField } from '../field/gender/gender-field.component';
import { IdField } from '../field/id/id-field.component';
import { DemographicsSection } from './demographics/demographics-section.component';
import { ContactInfoSection } from './contact-info/contact-info-section.component';
import { RelationshipsSection } from './patient-relationships/relationships-section.component';
import { DeathInfoSection } from './death-info/death-info-section.component';
import { Row, Column } from 'carbon-components-react';
import { SectionWrapper } from './section-wrapper.component';
import { DobField } from '../field/dob/dob.component';

enum Field {
  Address = 'address',
  Email = 'email',
  Phone = 'phone',
  Name = 'name',
  Id = 'id',
  Gender = 'gender',
  Dob = 'dob',
  Default = 'default',
}

enum Section {
  Demographics = 'demographics',
  Contact = 'contact',
  Death = 'death',
  Relationships = 'relationships',
  Default = 'default',
}

export const getField = (fieldName: string) => {
  switch (fieldName) {
    case Field.Address:
      return <AddressField />;
    case Field.Email:
      return <EmailField />;
    case Field.Phone:
      return <PhoneField />;
    case Field.Name:
      return <NameField />;
    case Field.Gender:
      return <GenderField />;
    case Field.Id:
      return <IdField />;
    case Field.Dob:
      return <DobField />;
    case Field.Default:
      return <div>Unknown Field {fieldName} </div>;
  }
};

export const getSection = (sectionProps, index, { setCapturePhotoProps }) => {
  let section = null;
  switch (sectionProps.id) {
    case Section.Demographics:
      section = <DemographicsSection {...sectionProps} setCapturePhotoProps={setCapturePhotoProps} />;
      break;
    case Section.Contact:
      section = <ContactInfoSection {...sectionProps} />;
      break;
    case Section.Death:
      section = <DeathInfoSection {...sectionProps} />;
      break;
    case Section.Relationships:
      section = <RelationshipsSection {...sectionProps} />;
      break;
    case Section.Default:
      section = <div>Unknown Section {sectionProps.id}</div>;
      break;
  }
  return (
    <Row>
      <Column lg={8} md={8} sm={3}>
        <SectionWrapper {...sectionProps} index={index}>
          {section}
        </SectionWrapper>
      </Column>
    </Row>
  );
};
