import React from 'react';
import { Input } from '../../input/basic-input/input/input.component';
import sectionStyles from './../section.scss';
import { useTranslation } from 'react-i18next';

interface PersonAttribute {
  label: string;
  uuid: string;
  placeholder: string;
  name: string;
}

interface PersonAttributeSectionType {
  name: string;
  personAttributes: Array<PersonAttribute>;
}

interface PersonAttributesSectionProps {
  attributeSections: Array<PersonAttributeSectionType>;
}

export const PersonAttributesSection: React.FC<PersonAttributesSectionProps> = ({ attributeSections }) => {
  const { t } = useTranslation();

  return (
    <>
      {attributeSections.map((attrSec: PersonAttributeSectionType) => (
        <div className={sectionStyles.formSection} key={attrSec.name}>
          <h5 className={`omrs-type-title-5 ${sectionStyles.formSectionTitle}`}>{t(attrSec.name)}</h5>
          {attrSec.personAttributes.map((attr: PersonAttribute) => (
            <section className={sectionStyles.fieldGroup} key={attr.uuid}>
              <Input type="text" label={t(attr.label)} name={attr.name} placeholder={t(attr.placeholder)} />
            </section>
          ))}
        </div>
      ))}
    </>
  );
};
