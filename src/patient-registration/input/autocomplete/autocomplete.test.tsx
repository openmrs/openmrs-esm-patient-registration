import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Autocomplete } from './autocomplete.component';
import { getAddressHierarchyMock } from '../../../../__mocks__/openmrs-esm-api.mock';

const CITIES = ['Bossier City', 'Boulder', 'Boston'];

const SEARCH_RESULTS = {
  data: [
    { address: `United States|Louisiana|Bossier Parish|${CITIES[0]}` },
    { address: `United States|Colorado|Boulder County|${CITIES[2]}` },
    { address: `United States|Massachusetts|Suffolk County|${CITIES[3]}` },
  ],
};

describe('autocomplete', () => {
  const noSearchResults = async () => {
    return Promise.resolve({ data: [] });
  };

  const setupAutocomplete = async (getSearchResults = noSearchResults) => {
    const { container, findByLabelText, queryByTestId, findByTestId } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <Autocomplete
            name="someName"
            label="someLabel"
            placeholder="some nice placeholder text"
            noResultsMessage="some custom message for no results"
            getSearchResults={getSearchResults}
          />
        </Form>
      </Formik>,
    );

    return { container, findByLabelText, queryByTestId, findByTestId };
  };

  it('has one search input field', async () => {
    const autocomplete = await setupAutocomplete();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    expect(searchInput).toBeTruthy();
  });

  it('search results are hidden on empty input', async () => {
    const autocomplete = await setupAutocomplete();
    await wait();
    const searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults).toBeNull();
  });

  it('provided custom message is displayed on input if there are no search results', async () => {
    const autocomplete = await setupAutocomplete();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Be');

    const searchResults = await autocomplete.findByTestId('search-results');
    expect(searchResults.textContent).toContain('some custom message');
  });

  it('search results are displayed on input if there are any', async () => {
    const getSearchResults = async () => {
      return getAddressHierarchyMock(SEARCH_RESULTS);
    };

    const autocomplete = await setupAutocomplete(getSearchResults);
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Bo');

    const results = await autocomplete.findByTestId('search-results');
    expect(results.textContent).toContain(CITIES[0]);
    expect(results.textContent).toContain(CITIES[1]);
  });

  it('closes search results dropdown when focus on input is lost', async () => {
    const autocomplete = await setupAutocomplete();
    const searchInput = (await autocomplete.findByLabelText('someLabel')) as HTMLInputElement;
    userEvent.type(searchInput, 'Be');

    await wait();
    let searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults.textContent).toBeTruthy();

    fireEvent.blur(searchInput);

    await wait();
    searchResults = autocomplete.queryByTestId('search-results');
    expect(searchResults).toBeNull();
  });
});