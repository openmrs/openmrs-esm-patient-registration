import React from 'react';
import { mount } from 'enzyme';
import Root from './root.component';
import PatientRegistration from './patient-registration/patient-registration.component';

window['getOpenmrsSpaBase'] = jest.fn().mockImplementation(() => '/');

describe('root component rendering', () => {
  const wrapper = mount(<Root />);

  it('renders the main content', () => {
    expect(wrapper.find('main.omrs-main-content')).toHaveLength(1);
  });

  it('renders the patient registration component', () => {
    expect(wrapper.find(PatientRegistration)).toHaveLength(1);
  });
});
