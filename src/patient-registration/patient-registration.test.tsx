import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PatientRegistration from './patient-registration.component';
import DateOfBirth from './widgets/date-of-birth/date-of-birth.component';

describe('patient registration component', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders without dying', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders a new patient title', () => {
    expect(wrapper.find('h1').text()).toEqual('New Patient');
  });

  it('renders the date of birth component', () => {
    expect(wrapper.find(DateOfBirth)).toHaveLength(1);
  });
});
