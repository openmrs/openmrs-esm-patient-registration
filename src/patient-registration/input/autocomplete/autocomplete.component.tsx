import React, { useEffect, useState } from 'react';
import { getAddressHierarchy } from '../../patient-registration.resource';
import styles from './../input.css';

interface AutocompleteProps {
  name: string;
  label: string;
  placeholder: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ name, label, placeholder }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getAddressHierarchy(search, abortController).then(({ data }) => setResults(data));
  }, [search]);

  return (
    <main className={styles.fieldRow}>
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
        />
        {search && results && (
          <ul className={styles.searchResults} data-testid="search-results">
            {results.length > 0 ? (
              results.map(result => <li key={result.uuid}>{result.name}</li>)
            ) : (
              <li>no address found, please enter manually</li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
};
