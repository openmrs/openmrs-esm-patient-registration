import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Root from './root.component';

window['getOpenmrsSpaBase'] = jest.fn().mockImplementation(() => '/');

describe('root component', () => {
  it('renders without dying', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Root />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the main (parent) component', () => {
    const wrapper = mount(<Root />);
    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('.omrs-main-content')).toHaveLength(1);
  });
});
