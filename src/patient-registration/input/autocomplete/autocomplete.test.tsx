import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Autocomplete } from './autocomplete.component';
import { getAddressHierarchyMock } from '../../../../__mocks__/openmrs-esm-api.mock';

const SEARCH_RESULTS = {
  data: [
    {
      name: 'Boston',
      uuid: 'a2e76113-fb17-46d0-943d-2036055e22c7',
      userGeneratedId: null,
      parent: {
        name: 'Suffolk County',
        uuid: 'e4f79f9e-4571-4317-bf5a-c86b2365aa21',
        userGeneratedId: null,
        parent: {
          name: 'Massachusetts',
          uuid: '6973c1e5-a3cc-418b-a18c-9baf9cbce07c',
          userGeneratedId: null,
          parent: {
            name: 'United States',
            uuid: '37c4eb36-744d-43dd-958b-72695b1eced8',
            userGeneratedId: null,
          },
        },
      },
    },
    {
      name: 'Boulder',
      uuid: 'dafc1e4b-f66d-4b68-a947-b8da7a35884e',
      userGeneratedId: null,
      parent: {
        name: 'Boulder County',
        uuid: 'e84e8531-59d0-4def-a552-f673b7466173',
        userGeneratedId: null,
        parent: {
          name: 'Colorado',
          uuid: '4cd1cd0a-f788-471c-a772-b51c631872f8',
          userGeneratedId: null,
          parent: {
            name: 'United States',
            uuid: '37c4eb36-744d-43dd-958b-72695b1eced8',
            userGeneratedId: null,
          },
        },
      },
    },
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
    expect(results.textContent).toContain(SEARCH_RESULTS.data[0].name);
    expect(results.textContent).toContain(SEARCH_RESULTS.data[1].name);
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
