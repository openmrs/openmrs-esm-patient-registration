import React from 'react';
import { Input } from '../../basic-input/input/input.component';
import styles from './../../input.scss';

interface AddressInputProps {
  address1Name: string;
  address2Name: string;
  cityVillageName: string;
  stateProvinceName: string;
  countryName: string;
  postalCodeName: string;
  addressTemplate?: string;
}

export const AddressInput: React.FC<AddressInputProps> = props => {
  return <AddressFieldRenderer {...props} />;
};

function AddressFieldRenderer(props: AddressInputProps) {
  if (props.addressTemplate) {
    return <AddressTemplateFieldRenderer addressTemplate={props.addressTemplate} />;
  } else {
    return <DefaultAddressFieldRenderer {...props} />;
  }
}

function parseString(v: string) {
  return new DOMParser().parseFromString(v, 'text/xml');
}

function AddressTemplateFieldRenderer({ addressTemplate }) {
  function getTagAsDocument(tagName: string, template: XMLDocument) {
    let tmp = template.getElementsByTagName(tagName)[0];
    return tmp ? parseString(tmp.outerHTML) : parseString('');
  }

  function getFieldValue(field: string, doc: XMLDocument) {
    let fieldElement = doc.getElementsByName(field)[0];
    return fieldElement ? fieldElement.getAttribute('value') : null;
  }

  function isRequired(field: string, doc: XMLDocument) {
    let fields = doc.getElementsByTagName('requiredElements')[0];
    if (fields) {
      let fieldsText: string[] = Array.prototype.map.call(
        fields.getElementsByTagName('string'),
        ({ textContent }) => textContent,
      );
      return fieldsText.includes(field);
    }
    return false;
  }

  function renderAddressFields() {
    const templateXmlDoc = parseString(addressTemplate);
    let lines = templateXmlDoc.getElementsByTagName('lineByLineFormat')[0].getElementsByTagName('string');
    let linesText: string[][] = Array.prototype.map.call(lines, ({ textContent }) => textContent.split(' '));
    let nameMappings = getTagAsDocument('nameMappings', templateXmlDoc);
    let elementDefaults = getTagAsDocument('elementDefaults', templateXmlDoc);
    type Field = {
      name: string;
      label: string;
      defaultValue: string;
      required: boolean;
    };
    let linesObj: Field[][] = linesText.map(sections => {
      let new_sections = sections.map(field => {
        let label = getFieldValue(field, nameMappings);
        let defaultValue = getFieldValue(field, elementDefaults);
        return {
          name: field,
          label,
          defaultValue,
          required: isRequired(field, templateXmlDoc),
        };
      });
      return new_sections;
    });
    return (
      <div className={styles.field}>
        {linesObj.map((sections, index) => (
          <section className={styles.fieldRow} key={`Section ${index}`}>
            {sections.map(field => (
              <Input
                type="text"
                label={field.label}
                name={field.name}
                placeholder=""
                key={field.name}
                required={field.required}
              />
            ))}
          </section>
        ))}
      </div>
    );
  }

  return <div>{renderAddressFields()}</div>;
}

function DefaultAddressFieldRenderer({
  address1Name,
  address2Name,
  cityVillageName,
  stateProvinceName,
  countryName,
  postalCodeName,
}: AddressInputProps) {
  return (
    <main>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <Input type="text" label="Address 1" name={address1Name} />
        <Input type="text" label="Address 2" name={address2Name} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <Input type="text" label="City/Village" name={cityVillageName} />
        <Input type="text" label="State/Province" name={stateProvinceName} />
      </section>
      <section className={`${styles.fieldRow} ${styles.subFieldRow}`}>
        <Input type="text" label="Country" name={countryName} />
        <Input type="text" label="Postal Code" name={postalCodeName} />
      </section>
    </main>
  );
}
