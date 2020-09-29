import React, { useState } from 'react';
import styles from './../input.css';

interface AutocompleteProps {
  name: string;
  label: string;
  placeholder: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ name, label, placeholder }) => {
  const [search, setSearch] = useState('');
  const [results, setSResults] = useState([]);

  return (
    <main className={styles.fieldRow}>
      {label && (
        <label className={`omrs-type-body-regular ${styles.label}`} htmlFor={name}>
          <span>{label}</span>
        </label>
      )}
      <div>
        <input
          className={`omrs-input-outlined ${styles.searchInput} ${styles.input}`}
          type="search"
          name={name}
          id={name}
          placeholder={placeholder}
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {search && (
          <ul className={styles.searchResults}>
            {results.length > 0 ? (
              results.map(result => <li>{result}</li>)
            ) : (
              <li>no address found, please enter manually</li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
};
