import React, { useEffect, useState } from 'react';
import styles from './../input.scss';
import { AddressSearchResults } from './address-search-results.component';

interface AutocompleteProps {
  name: string;
  label: string;
  placeholder: string;
  getSearchResults: (searchString: string, abortController: AbortController) => Promise<any>;
  noResultsMessage?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  label,
  placeholder,
  getSearchResults,
  noResultsMessage,
}) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchSearchResults = async () => {
      const searchResults = await getSearchResults(search, abortController);
      setResults(searchResults.data);
    };

    fetchSearchResults();
  }, [search, getSearchResults]);

  const toggleSearchFocused = () => setIsSearchFocused(!isSearchFocused);

  return (
    <main className={`${styles.fieldRow} ${styles.subFieldRow}`}>
      {label && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={name}>
          <span>{label}</span>
        </label>
      )}
      <div>
        <input
          autoComplete="off"
          className={`omrs-input-outlined ${styles.searchInput} ${styles.input}`}
          type="search"
          name={name}
          id={name}
          placeholder={placeholder}
          value={search}
          onChange={event => setSearch(event.target.value)}
          onFocus={toggleSearchFocused}
          onBlur={toggleSearchFocused}
        />
        {search && results && (
          <span data-testid="search-results">
            <AddressSearchResults
              results={results}
              noResultsMessage={noResultsMessage}
              showSearchResults={isSearchFocused}
            />
          </span>
        )}
      </div>
    </main>
  );
};
