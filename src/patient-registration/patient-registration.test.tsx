import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PatientRegistration from './patient-registration.component';
import DateOfBirth from './widgets/date-of-birth/date-of-birth.component';

describe('patient registration component', () => {
  it('renders without dying', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PatientRegistration />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the date of birth component', () => {
    const wrapper = shallow(<PatientRegistration />);
    expect(wrapper.find(DateOfBirth)).toHaveLength(1);
  });
});
