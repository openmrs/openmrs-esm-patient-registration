import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Root from './root.component';
import PatientRegistration from './patient-registration/patient-registration.component';

window['getOpenmrsSpaBase'] = jest.fn().mockImplementation(() => '/');

describe('root component', () => {
  const wrapper = mount(<Root />);

  it('renders without dying', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Root />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the main (parent) component', () => {
    expect(wrapper.find('main')).toHaveLength(1);
  });

  it('renders the patient registration component', () => {
    expect(wrapper.find(PatientRegistration)).toHaveLength(1);
  });
});
