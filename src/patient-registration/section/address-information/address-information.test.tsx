import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddressInformation } from './address-information.component';

const mockProps = {
  onChange: jest.fn(),
};

describe('address information', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<AddressInformation onChange={mockProps.onChange} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  const runInputStringTest = (name: string) => {
    it('updates the ' + name + ' value', () => {
      let testString = 'Test';
      wrapper.find('input[name="' + name + '"]').simulate('change', { target: { value: testString } });
      expect(wrapper.find('input[name="' + name + '"]').prop('value')).toEqual(testString);
    });
  };
  const runInputDateTest = (name: string) => {
    it('updates the ' + name + ' value', () => {
      let testDate = '2020-04-01';
      wrapper.find('input[name="' + name + '"]').simulate('change', { target: { valueAsDate: testDate } });
      expect(wrapper.find('input[name="' + name + '"]').prop('value')).toEqual(testDate);
    });
  };

  runInputStringTest('address1');
  runInputStringTest('address2');
  runInputStringTest('cityVillage');
  runInputStringTest('stateProvince');
  runInputStringTest('country');
  runInputStringTest('postalCode');
  runInputStringTest('latitude');
  runInputStringTest('longitude');

  runInputDateTest('startDate');
  runInputDateTest('endDate');
});
