import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FormValues } from '../../patient-registration.component';
import styles from './../input.css';

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
  const [showResults, setShowResults] = useState(showSearchResults);
  const hasSearchResults = results.length > 0;

  const setFormValues = (orderedAddressLevels): void => {
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
    if (showSearchResults) setShowResults(true);
  }, [showSearchResults]);

  return showResults ? (
    <ul className={styles.searchResults} ref={node}>
      {hasSearchResults ? (
        results.map((result, index) => {
          const orderedAddressLevels = splitAndReverse(result.address);
          const addressKey = `${result.address}${index}`;
          return (
            <li key={addressKey}>
              <button type="button" onClick={() => setFormValues(orderedAddressLevels)}>
                {orderedAddressLevels.map((level, index) => {
                  const cityVillage = index === 0;
                  const key = `${level}${index}`;
                  return cityVillage ? <strong key={key}>{level}</strong> : <span key={key}>, {level}</span>;
                })}
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
