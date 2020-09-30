import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Autocomplete } from './autocomplete.component';
import { getAddressHierarchyMock } from '../../../../__mocks__/openmrs-esm-api.mock';

const SEARCH_RESULTS = {
  data: [
    { address: 'United States|Louisiana|Bossier Parish|Bossier City' },
    { address: 'United States|Colorado|Boulder County|Boulder' },
    { address: 'United States|Massachusetts|Suffolk County|Boston' },
  ],
};

describe('autocomplete', () => {
  const noSearchResults = async () => {
    return Promise.resolve({ data: [] });
  };

  const setupSection = async (getSearchResults = noSearchResults) => {
    const { container, findByLabelText, queryByTestId, findByTestId } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <Autocomplete
            name="someName"
            label="someLabel"
            placeholder="some nice placeholder text"
            getSearchResults={getSearchResults}
          />
        </Form>
      </Formik>,
    );

    return { container, findByLabelText, queryByTestId, findByTestId };
  };

  it('has one search input field', async () => {
    const autocomplete = await setupSection();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    expect(searchInput).toBeTruthy();
  });

  it('search results are hidden on empty input', async () => {
    const autocomplete = await setupSection();
    await wait();
    const searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults).toBeNull();
  });

  it('message is displayed on input if there are no search results', async () => {
    const autocomplete = await setupSection();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Be');

    const searchResults = await autocomplete.findByTestId('search-results');
    expect(searchResults.textContent).toContain('no address found');
  });

  it('search results are displayed on input if there are any', async () => {
    const getSearchResults = async () => {
      return getAddressHierarchyMock(SEARCH_RESULTS);
    };

    const autocomplete = await setupSection(getSearchResults);
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Bo');

    const results = await autocomplete.findByTestId('search-results');
    expect(results.textContent).toContain(SEARCH_RESULTS.data[0].address);
    expect(results.textContent).toContain(SEARCH_RESULTS.data[1].address);
  });

  it('closes search results dropdown when focus on input is lost', async () => {
    const autocomplete = await setupSection();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Be');

    await wait();
    let searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults.textContent).toContain('no address found');

    fireEvent.blur(searchInput);

    await wait();
    searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults).toBeNull();
  });
});
