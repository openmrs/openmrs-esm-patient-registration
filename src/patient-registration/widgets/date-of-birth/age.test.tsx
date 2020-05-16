import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Age from './age.component';

describe('age widget rendering', () => {
  const wrapper = shallow(<Age />);

  it('renders a main container', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });

  it('renders three section items', () => {
    expect(wrapper.find('section.item')).toHaveLength(3);
  });

  it('renders three labels', () => {
    expect(wrapper.find('label')).toHaveLength(3);
  });

  it('renders a years label', () => {
    expect(wrapper.find('label.years').text()).toEqual('Years');
  });

  it('renders a months label', () => {
    expect(wrapper.find('label.months').text()).toEqual('Months');
  });

  it('renders a days label', () => {
    expect(wrapper.find('label.days').text()).toEqual('Days');
  });
});

describe('age interaction', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Age />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('has a default state', () => {
    expect(wrapper.state('years')).toEqual(0);
    expect(wrapper.state('months')).toEqual(0);
    expect(wrapper.state('days')).toEqual(0);
  });

  it('has a default input value', () => {
    expect(wrapper.find('input[name="years"]').get(0).props.value).toEqual(0);
    expect(wrapper.find('input[name="months"]').get(0).props.value).toEqual(0);
    expect(wrapper.find('input[name="days"]').get(0).props.value).toEqual(0);
  });

  it('updates years value', () => {
    wrapper.find('input[name="years"]').simulate('change', { target: { valueAsNumber: 1, name: 'years' } });
    expect(wrapper.state('years')).toEqual(1);
    expect(wrapper.find('input[name="years"]').get(0).props.value).toEqual(1);
  });

  it('updates months value', () => {
    wrapper.find('input[name="months"]').simulate('change', { target: { valueAsNumber: 2, name: 'months' } });
    expect(wrapper.state('months')).toEqual(2);
    expect(wrapper.find('input[name="months"]').get(0).props.value).toEqual(2);
  });

  it('updates days value', () => {
    wrapper.find('input[name="days"]').simulate('change', { target: { valueAsNumber: 3, name: 'days' } });
    expect(wrapper.state('days')).toEqual(3);
    expect(wrapper.find('input[name="days"]').get(0).props.value).toEqual(3);
  });
});
