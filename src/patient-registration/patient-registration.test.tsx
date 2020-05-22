import React from 'react';
import { shallow } from 'enzyme';
import { PatientRegistration } from './patient-registration.component';
import { PatientName } from './widgets/patient-name/patient-name.component';
import { LifeSpan } from './widgets/life-span/life-span.component';

describe('patient registration rendering', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a form dashboard', () => {
    expect(wrapper.find('form.dashboard')).toHaveLength(1);
  });

  it('renders a new patient title', () => {
    expect(wrapper.find('h1.title')).toHaveLength(1);
  });

  it('renders a demographics section', () => {
    expect(wrapper.find('section.demographics')).toHaveLength(1);
  });

  it('renders a submit section', () => {
    expect(wrapper.find('section.submit')).toHaveLength(1);
  });

  it('renders 2 widget divs', () => {
    expect(wrapper.find('div.widget')).toHaveLength(2);
  });

  it('renders save button', () => {
    expect(wrapper.find('button.save')).toHaveLength(1);
  });

  it('renders the patient name component', () => {
    expect(wrapper.find(PatientName)).toHaveLength(1);
  });

  it('renders a life span widget', () => {
    expect(wrapper.find(LifeSpan)).toHaveLength(1);
  });
});
