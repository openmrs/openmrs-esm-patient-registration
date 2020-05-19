import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PatientName from './patient-name.component';

describe('patient name widget rendering', () => {
  const wrapper = shallow(<PatientName />);

  it('renders a main container', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });

  it('renders 4 section items', () => {
    expect(wrapper.find('section.item')).toHaveLength(4);
  });

  it('renders 4 labels', () => {
    expect(wrapper.find('label')).toHaveLength(4);
  });

  it('renders a first name label', () => {
    expect(wrapper.find('label.first_name').text()).toEqual('First Name');
  });

  it('renders a first name label', () => {
    expect(wrapper.find('label.middle_name').text()).toEqual('Middle Name');
  });

  it('renders a last name label', () => {
    expect(wrapper.find('label.last_name').text()).toEqual('Last Name');
  });

  it('renders a required first name input', () => {
    expect(wrapper.find('input[name="first_name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="first_name"]').get(0).props.required).toEqual(true);
  });

  it('renders a middle name input', () => {
    expect(wrapper.find('input[name="middle_name"]')).toHaveLength(1);
  });

  it('renders a required last name input', () => {
    expect(wrapper.find('input[name="last_name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="last_name"]').get(0).props.required).toEqual(true);
  });

  it('renders a name unknown checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders a name unknown label', () => {
    expect(wrapper.find('span.name_unknown').text()).toEqual('Name unknown');
  });
});

describe('patient name interaction', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<PatientName />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });
});
