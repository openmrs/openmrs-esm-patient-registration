import React from 'react';
import ReactDOM from 'react-dom';
import { Name } from './name.component';

const mockProps = {
  fieldName: 'Name',
  nameValue: { preferred: true, givenName: 'John', middleName: '', familyName: 'Smith' },
  unknownValue: false,
  onNameChange: jest.fn(),
  onUnknownChange: jest.fn(),
};

describe('name field component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Name
        fieldName={mockProps.fieldName}
        nameValue={mockProps.nameValue}
        unknownValue={mockProps.unknownValue}
        onNameChange={mockProps.onNameChange}
        onUnknownChange={mockProps.onUnknownChange}
      />,
      div,
    );
  });
});
