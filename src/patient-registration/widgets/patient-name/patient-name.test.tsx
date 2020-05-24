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

  it('renders a name label', () => {
    expect(wrapper.find('label[htmlFor="patient-name"]')).toHaveLength(1);
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
    expect(wrapper.find('label[htmlFor="name-unknown"]')).toHaveLength(1);
  });

  it('has name unknown set to false by default', () => {
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(false);
  });

  it('updates the name unknown checkbox', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);
  });

  it('updates the patients names to blanks when patient unknown', () => {
    wrapper.find('input[name="first-name"]').simulate('change', { target: { value: 'Peter', name: 'first-name' } });
    wrapper.find('input[name="middle-name"]').simulate('change', { target: { value: 'Frank', name: 'middle-name' } });
    wrapper.find('input[name="last-name"]').simulate('change', { target: { value: 'Huber', name: 'last-name' } });
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });

    expect(wrapper.find('input[name="first-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="middle-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="last-name"]').prop('value')).toEqual('');
  });
});

describe('additional patient names', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PatientName onPatientNameChange={mockProps.onPatientNameChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('renders an additional name label', () => {
    expect(wrapper.find('label[htmlFor="additional-name"]')).toHaveLength(1);
  });

  it('renders an additional first name input', () => {
    expect(wrapper.find('input[name="additional-first-name"]')).toHaveLength(1);
  });

  it('renders an additional middle name input', () => {
    expect(wrapper.find('input[name="additional-middle-name"]')).toHaveLength(1);
  });

  it('renders an additional required last name input', () => {
    expect(wrapper.find('input[name="additional-last-name"]')).toHaveLength(1);
  });

  it('has a default input value', () => {
    expect(wrapper.find('input[name="additional-first-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="additional-middle-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="additional-last-name"]').prop('value')).toEqual('');
  });

  it('updates additional first name value', () => {
    wrapper
      .find('input[name="additional-first-name"]')
      .simulate('change', { target: { value: 'Harry', name: 'additional-first-name' } });
    expect(wrapper.find('input[name="additional-first-name"]').prop('value')).toEqual('Harry');
  });

  it('updates additional middle name value', () => {
    wrapper
      .find('input[name="additional-middle-name"]')
      .simulate('change', { target: { value: 'James', name: 'additional-middle-name' } });
    expect(wrapper.find('input[name="additional-middle-name"]').prop('value')).toEqual('James');
  });

  it('updates additional last name value', () => {
    wrapper
      .find('input[name="additional-last-name"]')
      .simulate('change', { target: { value: 'Potter', name: 'additional-last-name' } });
    expect(wrapper.find('input[name="additional-last-name"]').prop('value')).toEqual('Potter');
  });

  it('updates the additional names to blanks when patient unknown', () => {
    wrapper
      .find('input[name="additional-first-name"]')
      .simulate('change', { target: { value: 'Harry', name: 'additional-first-name' } });
    wrapper
      .find('input[name="additional-middle-name"]')
      .simulate('change', { target: { value: 'James', name: 'additional-middle-name' } });
    wrapper
      .find('input[name="additional-last-name"]')
      .simulate('change', { target: { value: 'Potter', name: 'additional-last-name' } });
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });

    expect(wrapper.find('input[name="additional-first-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="additional-middle-name"]').prop('value')).toEqual('');
    expect(wrapper.find('input[name="additional-last-name"]').prop('value')).toEqual('');
  });
});