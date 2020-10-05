import React, { useRef, useState } from 'react';
import { Search } from 'carbon-components-react';
import styles from './openmrs-autosuggest.css';
import { openmrsFetch } from '@openmrs/esm-api';

interface OpenmrsAutosuggestProps {
  name: string;
  placeholder: string;
  resource: string;
  onSuggestionSelected: (field: string, value: string) => void;
}

export const OpenmrsAutosuggest: React.FC<OpenmrsAutosuggestProps> = ({
  name,
  placeholder,
  resource,
  onSuggestionSelected,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [baseUrl, _] = useState('/ws/rest/v1/');
  const searchBox = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const abortController = new AbortController();
    const query = e.target.value;
    openmrsFetch(`${baseUrl}/${resource}?q=${query}`, {
      signal: abortController.signal,
    }).then(({ data }) => {
      setSuggestions(data.results);
    });
  };

  const handleClick = index => {
    const { display, uuid } = suggestions[index];
    searchBox.current.input.value = display;
    onSuggestionSelected(name, uuid);
    setSuggestions([]);
  };

  return (
    <div className={styles.autocomplete}>
      <Search
        name={name}
        id="autosuggest"
        placeHolderText={placeholder}
        labelText=""
        onChange={handleChange}
        ref={searchBox}
        className={styles.autocompleteSearch}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map(({ display, uuid }, index) => (
            <li //eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
              key={index}
              onClick={() => handleClick(index)}>
              {display}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
