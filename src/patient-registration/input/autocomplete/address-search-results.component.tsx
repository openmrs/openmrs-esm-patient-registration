import React from 'react';
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
  const hasSearchResults = results.length > 0;

  return (
    <ul className={styles.searchResults}>
      {hasSearchResults ? (
        results.map((result, index) => {
          const orderedAddressLevels = splitAndReverse(result.address);
          const addressKey = `${result.address}${index}`;
          return (
            <li key={addressKey}>
              {orderedAddressLevels.map((level, index) => {
                const cityVillage = index === 0;
                const key = `${level}${index}`;
                return cityVillage ? <strong key={key}>{level}</strong> : <span key={key}>, {level}</span>;
              })}
            </li>
          );
        })
      ) : (
        <li>{noResultsMessage ? noResultsMessage : 'no results found'}</li>
      )}
    </ul>
  );
};
