import React from 'react';
import styles from './../input.css';

type FullAdressString = {
  address: string;
};

interface SearchResultsProps {
  results: FullAdressString[];
  noResultsMessage?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, noResultsMessage }) => {
  return (
    <ul className={styles.searchResults}>
      {results.length > 0 ? (
        results.map((result, index) => <li key={result.address + index}>{result.address}</li>)
      ) : (
        <li>{noResultsMessage ? noResultsMessage : 'no results found'}</li>
      )}
    </ul>
  );
};
