import React from 'react';
import { shallow } from 'enzyme';
import PatientName from './patient-name.component';

describe('patient name widget rendering', () => {
  const wrapper = shallow(<PatientName />);

  it('renders a main container', () => {
    expect(wrapper.find('main.container')).toHaveLength(1);
  });

  it('renders 3 section items', () => {
    expect(wrapper.find('section.item')).toHaveLength(3);
  });

  it('renders 3 labels', () => {
    expect(wrapper.find('label')).toHaveLength(3);
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
});
