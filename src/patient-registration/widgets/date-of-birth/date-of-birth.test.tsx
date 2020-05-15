import React from 'react';
import { shallow, mount } from 'enzyme';
import DateOfBirth from './date-of-birth.component';

const mockProps = {
  setDate: jest.fn(),
  setEstimate: jest.fn(),
};

describe('date of birth', () => {
  const wrapper = shallow(<DateOfBirth setDate={mockProps.setDate} setEstimate={mockProps.setEstimate} />);

  it('renders a container', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  it('renders two input fields', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('renders two labels', () => {
    expect(wrapper.find('label')).toHaveLength(2);
  });

  it('renders a required date picker input', () => {
    expect(wrapper.find('[type="date"]')).toHaveLength(1);
    expect(wrapper.find('input').get(0).props.required).toEqual(true);
  });

  it('renders an date picker input label', () => {
    expect(wrapper.find('label').get(0).props.children).toEqual('Date of Birth');
  });

  it('renders an estimate checkbox', () => {
    expect(wrapper.find('[type="checkbox"]')).toHaveLength(1);
  });

  it('renders an estimate label', () => {
    expect(wrapper.find('span').text()).toEqual('Estimate');
  });
});

describe('date of birth interaction', () => {
  const wrapper = mount(<DateOfBirth setDate={mockProps.setDate} setEstimate={mockProps.setEstimate} />);

  it('has a default state and value', () => {
    expect(wrapper.state('date')).toEqual('dd/mm/yyyy');
    expect(wrapper.find('[type="date"]').prop('value')).toEqual('dd/mm/yyyy');
  });

  it('has estimate set to false by default', () => {
    expect(wrapper.state('estimate')).toEqual(false);
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(false);
  });

  it('changes the date of birth', () => {
    wrapper.find('[type="date"]').simulate('change', { target: { value: '12/10/1994' } });
    expect(wrapper.state('date')).toEqual('12/10/1994');
    expect(wrapper.find('[type="date"]').prop('value')).toEqual('12/10/1994');
  });

  it('changes the estimate', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.state('estimate')).toEqual(true);
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);
  });
});
