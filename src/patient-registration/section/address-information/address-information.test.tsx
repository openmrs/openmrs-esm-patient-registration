import React from 'react';
import { shallow } from 'enzyme';
import { AddressInformation } from './address-information.component';

const mockProps = {
  onChange: jest.fn(),
};

describe('address information', () => {
  const wrapper = shallow(<AddressInformation onChange={mockProps.onChange} />);

  it('renders a container', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });
});
