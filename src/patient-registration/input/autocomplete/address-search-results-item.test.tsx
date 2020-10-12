import React from 'react';
import { render } from '@testing-library/react';
import { AddressSearchResultsItem } from './address-search-results-item.component';

describe('address search results unit tests', () => {
  const setupSearchResultItem = async (index, addressLevel = 'some part of an address') => {
    const { container, getByText } = render(
      <AddressSearchResultsItem addressLevel={addressLevel} isBold={index === 0} />,
    );
    return { container, getByText };
  };

  it('renders the first part of an address in bold', async () => {
    const text = 'first part of an address';
    const searchResultItem = await setupSearchResultItem(0, text);
    const boldText = searchResultItem.container.getElementsByTagName('strong');
    const regularText = searchResultItem.container.getElementsByTagName('span');
    expect(boldText.length).toBe(1);
    expect(regularText.length).toBe(0);
  });

  it('renders the other parts than the first in regular spans', async () => {
    const text = 'third part of an address';
    const searchResultItem = await setupSearchResultItem(2, text);
    const boldText = searchResultItem.container.getElementsByTagName('strong');
    const regularText = searchResultItem.container.getElementsByTagName('span');
    expect(boldText.length).toBe(0);
    expect(regularText.length).toBe(1);
  });
});
