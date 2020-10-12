import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FormValues } from '../../patient-registration.component';
import styles from './../input.css';
import { AddressSearchResultsItem } from './address-search-results-item.component';

type FullAdressString = {
  address: string;
};

interface AddressSearchResultsProps {
  results: FullAdressString[];
  showSearchResults: boolean;
  noResultsMessage?: string;
}

const splitAndReverse = (string: string, delimiter: string = '|') => {
  return string.split(delimiter).reverse();
};

export const AddressSearchResults: React.FC<AddressSearchResultsProps> = ({
  results,
  noResultsMessage,
  showSearchResults,
}) => {
  const node = useRef<HTMLUListElement>();
  const { setFieldValue } = useFormikContext<FormValues>();
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(showSearchResults);

  const setFormValues = orderedAddressLevels => {
    // this currently matches the default address template only
    const cityVillage = orderedAddressLevels[0];
    const stateProvince = orderedAddressLevels[orderedAddressLevels.length - 2];
    const country = orderedAddressLevels[orderedAddressLevels.length - 1];

    setFieldValue('cityVillage', cityVillage);
    setFieldValue('stateProvince', stateProvince);
    setFieldValue('country', country);
    setShowResults(false);
  };

  const handleClickOutside = event => {
    if (node.current?.contains(event.target)) return;
    setShowResults(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const orderedAddressLevels = results.map(result => splitAndReverse(result.address));
    setSearchResults(orderedAddressLevels);
  }, [results]);

  useEffect(() => {
    if (showSearchResults) setShowResults(true);
  }, [showSearchResults]);

  return showResults ? (
    <ul className={styles.searchResults} ref={node}>
      {searchResults.length > 0 ? (
        searchResults.map((address, index) => {
          return (
            <li key={address + index}>
              <button type="button" onClick={() => setFormValues(address)}>
                {address.map((addressLevel, index) => (
                  <AddressSearchResultsItem key={addressLevel + index} addressLevel={addressLevel} index={index} />
                ))}
              </button>
            </li>
          );
        })
      ) : (
        <li>
          <button type="button">{noResultsMessage ? noResultsMessage : 'no results found'}</button>
        </li>
      )}
    </ul>
  ) : null;
};
