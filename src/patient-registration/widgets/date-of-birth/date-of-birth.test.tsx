import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import DateOfBirth from './date-of-birth.component';
import Age from './age.component';

const mockProps = {
  setDate: jest.fn(),
  setEstimate: jest.fn(),
};

const getFutureDate = () => {
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  return tomorrow.toISOString().split('T')[0];
};

describe('date of birth rendering', () => {
  const wrapper = shallow(<DateOfBirth setDate={mockProps.setDate} setEstimate={mockProps.setEstimate} />);

  it('renders a main container', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });

  it('renders four section items', () => {
    expect(wrapper.find('section.item')).toHaveLength(4);
  });

  it('renders a required date picker input', () => {
    expect(wrapper.find('input[type="date"]')).toHaveLength(1);
    expect(wrapper.find('input[type="date"]').get(0).props.required).toEqual(true);
  });

  it('renders a date of birth label', () => {
    expect(wrapper.find('label[htmlFor="date-of-birth"]').text()).toEqual('Date of Birth *');
  });

  it('renders a birth time label', () => {
    expect(wrapper.find('label[htmlFor="birth-time"]').text()).toEqual('Birth Time');
  });

  it('renders a birth time input', () => {
    expect(wrapper.find('input[type="time"]')).toHaveLength(1);
  });

  it('renders an estimate label', () => {
    expect(wrapper.find('span.estimate').text()).toEqual('Estimate');
  });

  it('renders an estimate checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders an age widget', () => {
    expect(wrapper.find(Age)).toHaveLength(1);
  });
});

describe('date of birth interaction', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<DateOfBirth setDate={mockProps.setDate} setEstimate={mockProps.setEstimate} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('has a default state and value', () => {
    expect(wrapper.state('date')).toEqual('');
    expect(wrapper.find('input[type="date"]').prop('value')).toEqual('');
  });

  it('has estimate set to false by default', () => {
    expect(wrapper.state('estimate')).toEqual(false);
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(false);
  });

  it('updates the date of birth', () => {
    wrapper.find('input[type="date"]').simulate('change', { target: { value: '1994-10-12' } });
    expect(wrapper.state('date')).toEqual('1994-10-12');
    expect(wrapper.find('input[type="date"]').prop('value')).toEqual('1994-10-12');
  });

  it('updates the date of birth past todays date', () => {
    wrapper.find('input[type="date"]').simulate('change', { target: { value: getFutureDate() } });
    expect(wrapper.state('date')).toEqual('');
    expect(wrapper.find('input[type="date"]').prop('value')).toEqual('');
  });

  it('updates the estimate', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.state('estimate')).toEqual(true);
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);
  });
});
