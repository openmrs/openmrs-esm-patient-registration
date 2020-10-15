import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { PersonAttributesSection } from './person-attributes-section.component';

const mockPersonAttributeSections = [
  {
    name: 'Additional Person Attributes',
    personAttributes: [
      {
        name: 'telephoneNumber',
        label: 'Telephone Number',
        uuid: 'fakeuuid1',
        placeholder: 'Enter telephone number',
      },
      {
        name: 'Birthplace',
        label: 'Birth place',
        uuid: 'fakeuuid2',
        placeholder: 'Enter birth place',
      },
    ],
  },
  {
    name: 'Contact Person Info',
    personAttributes: [
      {
        name: 'contactPersonName',
        label: 'Full Name',
        uuid: 'fakeuuid3',
        placeholder: 'Enter Full Name',
      },
    ],
  },
];

describe('person attributes section', () => {
  const setupSection = async () => {
    render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <PersonAttributesSection attributeSections={mockPersonAttributeSections} />
        </Form>
      </Formik>,
    );
    const allInputs = screen.queryAllByLabelText((content, element) => element.tagName.toLowerCase() === 'input');
    return Array.prototype.map.call(allInputs, input => input.name);
  };

  it('should have inputs corresponding to each configured person attribute', async () => {
    const inputNames = await setupSection();
    expect(inputNames.length).toBe(3);
  });
});
