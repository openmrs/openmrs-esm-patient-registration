import React from 'react';
import { shallow } from 'enzyme';
import { PatientRegistration } from './patient-registration.component';
import { LifeSpan } from './widgets/life-span/life-span.component';
import PatientName from './widgets/patient-name/patient-name.component';

describe('patient registration rendering', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a form dashboard', () => {
    expect(wrapper.find('form.dashboard')).toHaveLength(1);
  });

  it('renders a new patient title', () => {
    expect(wrapper.find('h1').text()).toEqual('New Patient');
  });

  it('renders 2 widget sections', () => {
    expect(wrapper.find('section.widget')).toHaveLength(2);
  });

  it('renders the patient name component', () => {
    expect(wrapper.find(PatientName)).toHaveLength(1);
  });

  it('renders a life span widget', () => {
    expect(wrapper.find(LifeSpan)).toHaveLength(1);
  });
});
