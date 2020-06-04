import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import dayjs from 'dayjs';
import { PersonalDetails } from './personal-details.component';

const mockProps = {
  onChange: jest.fn(),
};

describe('name interaction', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PersonalDetails onChange={mockProps.onChange} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  const runTextInput = (fieldName: string) => {
    it('updates ' + fieldName, () => {
      wrapper.find('input[name="' + fieldName + '"]').simulate('change', { target: { value: 'Test' } });
      expect(wrapper.find('input[name="' + fieldName + '"]').prop('value')).toEqual('Test');
    });
  };

  runTextInput('given-name');
  runTextInput('middle-name');
  runTextInput('family-name');
  runTextInput('additional-given-name');
  runTextInput('additional-middle-name');
  runTextInput('additional-family-name');

  it('clears the name fields when the unknown checkbox is checked', () => {
    wrapper.find('input[name="given-name"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="name-unknown"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input[name="given-name"]').prop('value')).toEqual('');
  });

  describe('field validation', () => {
    it('test passes placeholder', () => {
      expect(true).toEqual(true);
    });
  });
});

describe('gender interaction', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PersonalDetails onChange={mockProps.onChange} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('updates gender', () => {
    wrapper.find('select[name="gender"]').simulate('change', { target: { value: 'M' } });
    expect(wrapper.find('select[name="gender"]').prop('value')).toEqual('M');
  });
});

describe('birth date and age interaction', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PersonalDetails onChange={mockProps.onChange} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('updates birth date', () => {
    let testDate = '2020-05-10';
    wrapper.find('input[name="birth-date"]').simulate('change', { target: { valueAsDate: testDate } });
    expect(wrapper.find('input[name="birth-date"]').prop('value')).toEqual(testDate);
  });

  it('updates birth time', () => {
    let testTime = dayjs('05:11', 'HH:mm').toDate();
    wrapper.find('input[name="birth-time"]').simulate('change', { target: { valueAsDate: testTime } });
    expect(wrapper.find('input[name="birth-time"]').prop('value')).toEqual(dayjs(testTime).format('HH:mm'));
  });

  it('shows age inputs on estimate check', () => {
    wrapper.find('input[name="estimate"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input[name="birth-date"]').prop('disabled')).toEqual(true);
    expect(wrapper.find('input[name="years"]')).toHaveLength(1);
    expect(wrapper.find('input[name="months"]')).toHaveLength(1);
  });

  it('updates birth date', () => {
    let testYears = 1;
    let testMonths = 2;
    wrapper.find('input[name="estimate"]').simulate('change', { target: { checked: true } });
    wrapper.find('input[name="years"]').simulate('change', { target: { valueAsNumber: testYears } });
    wrapper.find('input[name="months"]').simulate('change', { target: { valueAsNumber: testMonths } });
    expect(wrapper.find('input[name="birth-date"]').prop('value')).toEqual(
      dayjs()
        .subtract(testYears, 'year')
        .subtract(testMonths, 'month')
        .format('YYYY-MM-DD'),
    );
  });

  describe('field validation', () => {
    it('test passes placeholder', () => {
      expect(true).toEqual(true);
    });
  });
});