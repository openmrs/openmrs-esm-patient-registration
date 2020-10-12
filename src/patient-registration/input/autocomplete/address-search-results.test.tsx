import React from 'react';
import { act, render, wait } from '@testing-library/react';
import { AddressSearchResults } from './address-search-results.component';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';

const mockSetValues = jest.fn();
jest.mock('formik', () => {
  return {
    ...jest.requireActual('formik'),
    useFormikContext: () => ({
      setFieldValue: mockSetValues,
    }),
  };
});

const SEARCH_RESULTS = [
  { address: 'United States|Louisiana|Bossier Parish|Bossier City' },
  { address: 'United States|Colorado|Boulder County|Boulder' },
  { address: 'United States|Massachusetts|Suffolk County|Boston' },
];

describe('address search results unit tests', () => {
  const setupSearchResults = async (results = [], noResultsMessage = null) => {
    const { container, findByLabelText, getByRole, findByTestId } = render(
      <AddressSearchResults results={results} noResultsMessage={noResultsMessage} showSearchResults={true} />,
    );

    return { container, findByLabelText, getByRole, findByTestId };
  };

  it('default message is displayed on empty search results if no custom message is provided', async () => {
    const searchResults = await setupSearchResults();
    const noResultsMessage = searchResults.getByRole('list').firstChild;
    expect(noResultsMessage.textContent).toContain('No Results Found');
  });

  it('custom message is displayed on empty search results if provided', async () => {
    const searchResults = await setupSearchResults([], 'sorry, nothing found!');
    const noResultsMessage = searchResults.getByRole('list').firstChild;
    expect(noResultsMessage.textContent).toContain('sorry');
  });

  it('search results are displayed if there are any', async () => {
    const searchResults = await setupSearchResults(SEARCH_RESULTS);
    const lastSearchResult = searchResults.getByRole('list').lastChild;
    expect(lastSearchResult.textContent).toContain('Boston, Suffolk County, Massachusetts, United States');
  });

  it('search results are separated correctly', async () => {
    const searchResults = await setupSearchResults(SEARCH_RESULTS);
    const firstSearchResult = searchResults.getByRole('list').firstChild;
    expect(firstSearchResult.textContent.includes('|')).toBe(false);
  });

  it('search results are ordered correctly', async () => {
    const searchResults = await setupSearchResults(SEARCH_RESULTS);
    const firstSearchResult = searchResults.getByRole('list').getElementsByTagName('button')[0].childNodes;
    const firstPart = firstSearchResult[0];
    const lastPart = firstSearchResult[firstSearchResult.length - 1];
    expect(firstPart.textContent).toBe('Bossier City');
    expect(lastPart.textContent).toContain('United States');
  });

  it('search results are removed on click outside the component', async () => {
    const searchResults = await setupSearchResults();
    expect(searchResults.container.innerHTML).toBeTruthy();
    act(() => userEvent.click(searchResults.container));
    expect(searchResults.container.innerHTML).toBeFalsy();
  });
});

describe('address search results formik integration tests', () => {
  const setupSearchResults = async (results = [], noResultsMessage = null) => {
    const { container, findByLabelText, getByRole, findByTestId } = render(
      <Formik initialValues={{ cityVillage: '', stateProvince: '', country: '' }} onSubmit={null}>
        <Form>
          <AddressSearchResults results={results} noResultsMessage={noResultsMessage} showSearchResults={true} />,
        </Form>
      </Formik>,
    );

    return { container, findByLabelText, getByRole, findByTestId };
  };
  it('updates address related form values with search result values on click', async () => {
    const searchResults = await setupSearchResults(SEARCH_RESULTS);
    const firstSearchResult = searchResults.getByRole('list').getElementsByTagName('button')[0];
    userEvent.click(firstSearchResult);
    await wait();
    expect(mockSetValues).toHaveBeenCalledWith('cityVillage', 'Bossier City');
    expect(mockSetValues).toHaveBeenCalledWith('stateProvince', 'Louisiana');
    expect(mockSetValues).toHaveBeenCalledWith('country', 'United States');
  });
});
