import React, { useEffect, useState } from 'react';
import styles from '../field.scss';
import { Input } from '../../input/basic-input/input/input.component';
import { fetchAddressTemplate } from '../../patient-registration.resource';
import { useTranslation } from 'react-i18next';

const parseString = (xmlDockAsString: string) => new DOMParser().parseFromString(xmlDockAsString, 'text/xml');

const getTagAsDocument = (tagName: string, template: XMLDocument) => {
  const tmp = template.getElementsByTagName(tagName)[0];
  return tmp ? parseString(tmp.outerHTML) : parseString('');
};

const getFieldValue = (field: string, doc: XMLDocument) => {
  const fieldElement = doc.getElementsByTagName(field)[0];
  return fieldElement ? fieldElement.getAttribute('value') : null;
};

export const AddressField: React.FC = () => {
  const [addressFields, setAddressFields] = useState([]);
  const [addressTemplate, setAddressTemplate] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    fetchAddressTemplate(abortController).then(({ data }) => {
      setAddressTemplate(data.results[0].value);
    });
  }, []);

  useEffect(() => {
    const templateXmlDoc = parseString(addressTemplate);
    const nameMappings = getTagAsDocument('nameMappings', templateXmlDoc);
    const elementDefaults = getTagAsDocument('elementdefaults', templateXmlDoc);
    const properties = nameMappings.getElementsByTagName('property');
    const propertiesObj = Array.prototype.map.call(properties, (property: Element) => {
      const name = property.getAttribute('name');
      const labelText = property.getAttribute('value');
      const value = getFieldValue(name, elementDefaults);
      return {
        id: name,
        name,
        labelText,
        value,
      };
    });
    setAddressFields(propertiesObj);
  }, [addressTemplate]);

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('addressHeader', 'Address')}</h4>
      {addressFields.map(attributes => (
        <Input key={attributes.name} {...attributes} light />
      ))}
    </div>
  );
};
