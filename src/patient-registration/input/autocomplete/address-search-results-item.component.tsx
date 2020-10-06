import React from 'react';

interface AddressSearchResultsItemProps {
  addressLevel: string;
  index: number;
}

export const AddressSearchResultsItem: React.FC<AddressSearchResultsItemProps> = ({ addressLevel, index }) => {
  const cityVillage = index === 0;
  return cityVillage ? <strong>{addressLevel}</strong> : <span>, {addressLevel}</span>;
};
