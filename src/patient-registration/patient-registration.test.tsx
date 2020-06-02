import React from 'react';
import { shallow } from 'enzyme';
import { PatientRegistration } from './patient-registration.component';
import { PersonalDetails } from './section/personal-details.component';

const mockProps = {
  onChange: jest.fn(),
};

describe('patient registration', () => {
  const wrapper = shallow(<PatientRegistration />);

  it('renders a form dashboard', () => {
    expect(wrapper.find('form.dashboard')).toHaveLength(1);
  });

  it('renders a new patient title', () => {
    expect(wrapper.find('h1.title')).toHaveLength(1);
  });

  it('renders a personal details subtitle', () => {
    expect(wrapper.find('h2.subTitle')).toHaveLength(1);
  });

  it('renders a personal details section', () => {
    expect(wrapper.find('section.personalDetails')).toHaveLength(1);
  });

  it('renders a personal details component', () => {
    expect(wrapper.find(<PersonalDetails onChange={mockProps.onChange} />));
  });

  it('renders a submit button', () => {
    expect(wrapper.find('button.submit')).toHaveLength(1);
  });
});

describe('patient registration form submit', () => {
  it('test passes placeholder', () => {
    expect(true).toEqual(true);
  });
});
