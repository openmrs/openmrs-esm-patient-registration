import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Autocomplete } from './autocomplete.component';

describe('autocomplete', () => {
  const setupSection = async () => {
    const { container, getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <Autocomplete name="someName" label="someLabel" placeholder="some nice placeholder text" />
        </Form>
      </Formik>,
    );

    return { container, getByLabelText };
  };

  it('has one search input field', async () => {
    const autocomplete = await setupSection();
    expect(autocomplete.container.querySelectorAll('.searchInput').length).toBe(1);
  });

  it('search results are hidden on empty input', async () => {
    const autocomplete = await setupSection();
    expect(autocomplete.container.querySelectorAll('.searchResults').length).toBe(0);
  });

  it('message is displayed if there are no search results', async () => {
    const autocomplete = await setupSection();
    const searchInput = autocomplete.getByLabelText('someLabel') as HTMLInputElement;
    await userEvent.type(searchInput, 'Boston');
    expect(autocomplete.container.querySelector('.searchResults').textContent).toContain('no address found');
  });
});
