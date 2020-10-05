import { useFormikContext } from 'formik';
import React from 'react';
import { FormValues } from '../../patient-registration.component';
import styles from './../input.css';

type FullAdressString = {
  address: string;
};

interface AddressSearchResultsProps {
  results: FullAdressString[];
  noResultsMessage?: string;
}

const splitAndReverse = (string: string, delimiter: string = '|') => {
  return string.split(delimiter).reverse();
};

export const AddressSearchResults: React.FC<AddressSearchResultsProps> = ({ results, noResultsMessage }) => {
  const { setFieldValue } = useFormikContext<FormValues>();
  const hasSearchResults = results.length > 0;

  const setFormValues = (orderedAddressLevels): void => {
    const cityVillage = orderedAddressLevels[0];
    const stateProvince = orderedAddressLevels[orderedAddressLevels.length - 2];
    const country = orderedAddressLevels[orderedAddressLevels.length - 1];

    setFieldValue('cityVillage', cityVillage);
    setFieldValue('stateProvince', stateProvince);
    setFieldValue('country', country);
  };

  return (
    <ul className={styles.searchResults}>
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
        <li>{noResultsMessage ? noResultsMessage : 'no results found'}</li>
      )}
    </ul>
  );
};
