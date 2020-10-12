import React from 'react';

interface AddressSearchResultsItemProps {
  addressLevel: string;
  isBold: boolean;
}

export const AddressSearchResultsItem: React.FC<AddressSearchResultsItemProps> = ({ addressLevel, isBold }) => {
  return isBold ? <strong>{addressLevel}</strong> : <span>{addressLevel}</span>;
};
