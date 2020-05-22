import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { PatientName } from './patient-name.component';

const mockProps = {
  onPatientNameChange: jest.fn(),
};

describe('patient name container', () => {
  const wrapper = shallow(<PatientName onPatientNameChange={mockProps.onPatientNameChange} />);

  it('renders a main', () => {
    expect(wrapper.find('main')).toHaveLength(1);
  });

  it('renders 2 sections', () => {
    expect(wrapper.find('section')).toHaveLength(2);
  });
});

describe('patient name', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<PatientName onPatientNameChange={mockProps.onPatientNameChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a first name placeholder', () => {
    expect(wrapper.find('input[name="first-name"]').prop('placeholder')).toEqual('First Name');
  });

  it('renders a first name placeholder', () => {
    expect(wrapper.find('input[name="middle-name"]').prop('placeholder')).toEqual('Middle Name');
  });

  it('renders a last name placeholder', () => {
    expect(wrapper.find('input[name="last-name"]').prop('placeholder')).toEqual('Last Name');
  });

  it('renders a required first name input', () => {
    expect(wrapper.find('input[name="first-name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="first-name"]').prop('required')).toEqual(true);
  });

  it('renders a middle name input', () => {
    expect(wrapper.find('input[name="middle-name"]')).toHaveLength(1);
  });

  it('renders a required last name input', () => {
    expect(wrapper.find('input[name="last-name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="last-name"]').prop('required')).toEqual(true);
  });

  it('has a default input value', () => {
    expect(wrapper.find('input[name="first-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="middle-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="last-name"]').prop('value')).toEqual('');
  });

  it('updates first name value', () => {
    wrapper.find('input[name="first-name"]').simulate('change', { target: { value: 'Peter', name: 'first_name' } });
    expect(wrapper.find('input[name="first-name"]').prop('value')).toEqual('Peter');
  });

  it('updates middle name value', () => {
    wrapper.find('input[name="middle-name"]').simulate('change', { target: { value: 'Frank', name: 'middle_name' } });
    expect(wrapper.find('input[name="middle-name"]').prop('value')).toEqual('Frank');
  });

  it('updates last name value', () => {
    wrapper.find('input[name="last-name"]').simulate('change', { target: { value: 'Huber', name: 'last_name' } });
    expect(wrapper.find('input[name="last-name"]').prop('value')).toEqual('Huber');
  });
});

describe('name unknown', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PatientName onPatientNameChange={mockProps.onPatientNameChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders a name unknown checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders a name unknown label', () => {
    expect(wrapper.find('label[htmlFor="name-unknown"]').text()).toEqual('Name Unknown');
  });

  it('has name unknown set to false by default', () => {
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(false);
  });

  it('updates the name unknown checkbox', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);
  });

  it('updates the patients names to blanks when patient unknown', () => {
    wrapper.find('input[name="first-name"]').simulate('change', { target: { value: 'Peter', name: 'first_name' } });
    wrapper.find('input[name="middle-name"]').simulate('change', { target: { value: 'Frank', name: 'middle_name' } });
    wrapper.find('input[name="last-name"]').simulate('change', { target: { value: 'Huber', name: 'last_name' } });
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });

    expect(wrapper.find('input[name="first-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="middle-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="last-name"]').prop('value')).toEqual('');
  });
});
