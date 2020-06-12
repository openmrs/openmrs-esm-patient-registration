import React from 'react';
import ReactDOM from 'react-dom';
import { Address } from './address.component';

const mockProps = {
  value: {
    address1: '',
    address2: '',
    cityVillage: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    latitude: '',
    longitude: '',
    startDate: null,
    endDate: null,
  },
  onChange: jest.fn(),
};

describe('address field component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Address value={mockProps.value} onChange={mockProps.onChange} />, div);
  });
});
