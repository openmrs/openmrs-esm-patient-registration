import React from 'react';
import { shallow } from 'enzyme';
import { PatientRegistration } from './patient-registration.component';
import { PatientName } from './widgets/patient-name/patient-name.component';
import { LifeSpan } from './widgets/life-span/life-span.component';

describe('patient registration', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a form dashboard', () => {
    expect(wrapper.find('form.dashboard')).toHaveLength(1);
  });

  it('renders a new patient title', () => {
    expect(wrapper.find('h1.title')).toHaveLength(1);
  });
});

describe('demographics section', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a demographics section', () => {
    expect(wrapper.find('section.demographics')).toHaveLength(1);
  });

  it('renders 2 widget divs', () => {
    expect(wrapper.find('div.widget')).toHaveLength(2);
  });

  it('renders the patient name component', () => {
    expect(wrapper.find(PatientName)).toHaveLength(1);
  });

  it('renders a life span widget', () => {
    expect(wrapper.find(LifeSpan)).toHaveLength(1);
  });
});

describe('submit section', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a submit section', () => {
    expect(wrapper.find('section.submit')).toHaveLength(1);
  });

  it('renders save submit button', () => {
    expect(wrapper.find('button[id="save"]')).toHaveLength(1);
    expect(wrapper.find('button[id="save"]').prop('type')).toEqual('submit');
  });
});
