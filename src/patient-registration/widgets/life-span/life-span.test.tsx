import React from 'react';
import { shallow, mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import moment from 'moment';
import { LifeSpan } from './life-span.component';

require('moment-precise-range-plugin');

const mockProps = {
  onLifeSpanChange: jest.fn(),
};

describe('life span container', () => {
  const wrapper = shallow(<LifeSpan onLifeSpanChange={mockProps.onLifeSpanChange} />);

  it('renders a main container ', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });

  it('renders 2 sections', () => {
    expect(wrapper.find('section')).toHaveLength(2);
  });

  it('renders 4 divs', () => {
    expect(wrapper.find('div')).toHaveLength(4);
  });
});

describe('date of birth', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<LifeSpan onLifeSpanChange={mockProps.onLifeSpanChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a label', () => {
    expect(wrapper.find('label[htmlFor="date-of-birth"]').text()).toEqual('Date of Birth');
  });

  it('renders a date of birth input', () => {
    expect(wrapper.find('input[id="date-of-birth"]').prop('type')).toEqual('date');
  });

  it('has a default value of an empty string', () => {
    expect(wrapper.find('input[id="date-of-birth"]').prop('value')).toEqual('');
  });

  it('updates the value to a new date of birth', () => {
    wrapper.find('input[id="date-of-birth"]').simulate('change', { target: { value: '1994-10-24' } });
    expect(wrapper.find('input[id="date-of-birth"]').prop('value')).toEqual('1994-10-24');
  });

  it('updates the age', () => {
    let dateOfBirth = moment('1994-10-24', 'YYYY-MM-DD');
    let difference = moment().preciseDiff(dateOfBirth, true);

    wrapper.find('input[id="date-of-birth"]').simulate('change', { target: { value: dateOfBirth } });
    expect(wrapper.find('input[id="years"]').prop('value')).toEqual(difference.years);
    expect(wrapper.find('input[id="months"]').prop('value')).toEqual(difference.months);
    expect(wrapper.find('input[id="days"]').prop('value')).toEqual(difference.days);
  });
});

describe('birth time', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<LifeSpan onLifeSpanChange={mockProps.onLifeSpanChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a label', () => {
    expect(wrapper.find('label[htmlFor="birth-time"]').text()).toEqual('Birth Time');
  });

  it('renders a birth time input', () => {
    expect(wrapper.find('input[id="birth-time"]').prop('type')).toEqual('time');
  });

  it('has a default value of an empty string', () => {
    expect(wrapper.find('input[id="birth-time"]').prop('value')).toEqual('');
  });

  it('updates the value to a new birth time', () => {
    wrapper.find('input[id="birth-time"]').simulate('change', { target: { value: '18:32' } });
    expect(wrapper.find('input[id="birth-time"]').prop('value')).toEqual('18:32');
  });
});

describe('age', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<LifeSpan onLifeSpanChange={mockProps.onLifeSpanChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a years, months, and days label', () => {
    expect(wrapper.find('label[htmlFor="years"]').text()).toEqual('Years');
    expect(wrapper.find('label[htmlFor="months"]').text()).toEqual('Months');
    expect(wrapper.find('label[htmlFor="days"]').text()).toEqual('Days');
  });

  it('renders a years, months, and days input', () => {
    expect(wrapper.find('input[id="years"]').prop('type')).toEqual('number');
    expect(wrapper.find('input[id="months"]').prop('type')).toEqual('number');
    expect(wrapper.find('input[id="days"]').prop('type')).toEqual('number');
  });

  it('has default values of 0', () => {
    expect(wrapper.find('input[id="years"]').prop('value')).toEqual(0);
    expect(wrapper.find('input[id="months"]').prop('value')).toEqual(0);
    expect(wrapper.find('input[id="days"]').prop('value')).toEqual(0);
  });

  it('updates the values to a new age', () => {
    wrapper.find('input[id="years"]').simulate('change', { target: { name: 'years', value: 3 } });
    wrapper.find('input[id="months"]').simulate('change', { target: { name: 'months', value: 2 } });
    wrapper.find('input[id="days"]').simulate('change', { target: { name: 'days', value: 1 } });
    expect(wrapper.find('input[id="years"]').prop('value')).toEqual(3);
    expect(wrapper.find('input[id="months"]').prop('value')).toEqual(2);
    expect(wrapper.find('input[id="days"]').prop('value')).toEqual(1);
  });

  it('updates the date of birth', () => {
    let difference = moment()
      .subtract(3, 'years')
      .subtract(2, 'months')
      .subtract(1, 'days');

    wrapper.find('input[id="years"]').simulate('change', { target: { name: 'years', value: 3 } });
    wrapper.find('input[id="months"]').simulate('change', { target: { name: 'months', value: 2 } });
    wrapper.find('input[id="days"]').simulate('change', { target: { name: 'days', value: 1 } });
    expect(wrapper.find('input[id="date-of-birth"]').prop('value')).toEqual(difference.toISOString().split('T')[0]);
  });
});

describe('estimate item', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<LifeSpan onLifeSpanChange={mockProps.onLifeSpanChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a label', () => {
    expect(wrapper.find('label[htmlFor="estimate"]').text()).toEqual('Estimate');
  });

  it('renders a checkbox input', () => {
    expect(wrapper.find('input[id="estimate"]').prop('type')).toEqual('checkbox');
  });

  it('has a default value of false', () => {
    expect(wrapper.find('input[id="estimate"]').prop('checked')).toEqual(false);
  });

  it('updates the value to true when checked', () => {
    wrapper.find('input[id="estimate"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input[id="estimate"]').prop('checked')).toEqual(true);
  });
});
