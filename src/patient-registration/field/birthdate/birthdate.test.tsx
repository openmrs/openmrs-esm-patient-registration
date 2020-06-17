import React from 'react';
import ReactDOM from 'react-dom';
import { Birthdate } from './birthdate.component';

const mockProps = {
  birthdateValue: null,
  birthdateEstimatedValue: false,
  birthtimeValue: null,
  onBirthdateChange: jest.fn(),
  onBirthdateEstimatedChange: jest.fn(),
  onBirthtimeChange: jest.fn(),
};

describe('birthdate field component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Birthdate
        birthdateValue={mockProps.birthdateValue}
        birthdateEstimatedValue={mockProps.birthdateEstimatedValue}
        birthtimeValue={mockProps.birthtimeValue}
        onBirthdateChange={mockProps.onBirthdateChange}
        onBirthdateEstimatedChange={mockProps.onBirthdateEstimatedChange}
        onBirthtimeChange={mockProps.onBirthtimeChange}
      />,
      div,
    );
  });
});
