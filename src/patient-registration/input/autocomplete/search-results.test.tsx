import React from 'react';
import { render } from '@testing-library/react';
import { SearchResults } from './search-results.component';

const SEARCH_RESULTS = [
  { address: 'United States|Louisiana|Bossier Parish|Bossier City' },
  { address: 'United States|Colorado|Boulder County|Boulder' },
  { address: 'United States|Massachusetts|Suffolk County|Boston' },
];

describe('search results', () => {
  const setupSearchResults = async (results = [], noResultsMessage = null) => {
    const { container, findByLabelText, getByRole, findByTestId } = render(
      <SearchResults results={results} noResultsMessage={noResultsMessage} />,
    );

    return { container, findByLabelText, getByRole, findByTestId };
  };

  it('default message is displayed on empty search results if no custom message is provided', async () => {
    const searchResults = await setupSearchResults();
    const noResultsMessage = searchResults.getByRole('list').firstChild;
    expect(noResultsMessage.textContent).toContain('no results found');
  });

  it('custom message is displayed on empty search results if provided', async () => {
    const searchResults = await setupSearchResults([], 'sorry, nothing found!');
    const noResultsMessage = searchResults.getByRole('list').firstChild;
    expect(noResultsMessage.textContent).toContain('sorry');
  });

  it('search results are displayed if there are any', async () => {
    const searchResults = await setupSearchResults(SEARCH_RESULTS);
    const noResultsMessage = searchResults.getByRole('list').lastChild;
    expect(noResultsMessage.textContent).toContain(SEARCH_RESULTS[SEARCH_RESULTS.length - 1].address);
  });
});
