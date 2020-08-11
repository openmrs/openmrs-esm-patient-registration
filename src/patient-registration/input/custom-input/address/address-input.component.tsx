import React from 'react';
import { Input } from '../../basic-input/input/input.component';
import styles from './../../input.css';

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
  if (props.addressTemplate) return <AddressTemplateFieldRenderer addressTemplate={props.addressTemplate} />;
  else return <DefaultAddressFieldRenderer {...props} />;
}

function AddressTemplateFieldRenderer({ addressTemplate }) {
  function renderAddressFields() {
    const templateXmlDoc = new DOMParser().parseFromString(addressTemplate, 'text/xml');
    let lines = templateXmlDoc.getElementsByTagName('lineByLineFormat')[0].getElementsByTagName('string');
    let linesText: string[][] = Array.prototype.map.call(lines, ({ textContent }) => textContent.split(' '));
    return (
      <main className={styles.fiield}>
        {linesText.map((sections, index) => (
          <section className={styles.fieldRow} key={`Section ${index}`}>
            {sections.map(field => (
              <TextInput label={field} name={field} placeholder="" key={field} showLabel={true} />
            ))}
          </section>
        ))}
      </main>
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
