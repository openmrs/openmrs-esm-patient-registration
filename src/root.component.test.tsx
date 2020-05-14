import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import Root from './root.component';

window['getOpenmrsSpaBase'] = jest.fn().mockImplementation(() => '/');

afterAll(cleanup);

describe('root component', () => {
  it('renders without dying', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Root />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the main (parent) component', () => {
    const wrapper = render(<Root />);
    expect(wrapper.container.getElementsByTagName('main')).toHaveLength(1);
    expect(wrapper.container.getElementsByClassName('omrs-main-content')).toHaveLength(1);
  });
});
