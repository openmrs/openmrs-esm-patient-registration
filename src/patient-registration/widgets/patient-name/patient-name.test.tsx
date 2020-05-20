import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PatientName from './patient-name.component';

const mockProps = {
  setNameUnknown: jest.fn(),
};

describe('patient name widget rendering', () => {
  const wrapper = shallow(<PatientName setNameUnknown={mockProps.setNameUnknown} />);

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
    wrapper = shallow(<PatientName setNameUnknown={mockProps.setNameUnknown} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('has a default state', () => {
    expect(wrapper.state('first_name')).toEqual('');
    expect(wrapper.state('middle_name')).toEqual('');
    expect(wrapper.state('last_name')).toEqual('');
  });

  it('has a default input value', () => {
    expect(wrapper.find('input[name="first_name"]').get(0).props.value).toEqual('');
    expect(wrapper.find('input[name="middle_name"]').get(0).props.value).toEqual('');
    expect(wrapper.find('input[name="last_name"]').get(0).props.value).toEqual('');
  });

  it('updates first_name value', () => {
    wrapper.find('input[name="first_name"]').simulate('change', { target: { value: 'Peter', name: 'first_name' } });
    expect(wrapper.state('first_name')).toEqual('Peter');
    expect(wrapper.find('input[name="first_name"]').get(0).props.value).toEqual('Peter');
  });

  it('updates middle_name value', () => {
    wrapper.find('input[name="middle_name"]').simulate('change', { target: { value: 'Frank', name: 'middle_name' } });
    expect(wrapper.state('middle_name')).toEqual('Frank');
    expect(wrapper.find('input[name="middle_name"]').get(0).props.value).toEqual('Frank');
  });

  it('updates last_name value', () => {
    wrapper.find('input[name="last_name"]').simulate('change', { target: { value: 'Huber', name: 'last_name' } });
    expect(wrapper.state('last_name')).toEqual('Huber');
    expect(wrapper.find('input[name="last_name"]').get(0).props.value).toEqual('Huber');
  });
});

describe('name unknown interaction', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<PatientName setNameUnknown={mockProps.setNameUnknown} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('has name unknown set to false by default', () => {
    expect(wrapper.state('name_unknown')).toEqual(false);
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(false);
  });

  it('updates the name unknown checkbox', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.state('name_unknown')).toEqual(true);
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);
  });

  it('updates the patients names to blanks when patient unknown', () => {
    wrapper.find('[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.state('name_unknown')).toEqual(true);
    expect(wrapper.find('[type="checkbox"]').prop('checked')).toEqual(true);

    expect(wrapper.state('first_name')).toEqual('');
    expect(wrapper.find('input[name="first_name"]').get(0).props.value).toEqual('');

    expect(wrapper.state('middle_name')).toEqual('');
    expect(wrapper.find('input[name="middle_name"]').get(0).props.value).toEqual('');

    expect(wrapper.state('last_name')).toEqual('');
    expect(wrapper.find('input[name="last_name"]').get(0).props.value).toEqual('');
  });
});
