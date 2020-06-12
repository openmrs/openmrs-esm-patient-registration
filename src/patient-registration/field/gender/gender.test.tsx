import React from 'react';
import ReactDOM from 'react-dom';
import { Gender } from './gender.component';

const mockProps = {
  value: '',
  onChange: jest.fn(),
};

describe('gender field component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Gender value={mockProps.value} onChange={mockProps.onChange} />, div);
  });
});
