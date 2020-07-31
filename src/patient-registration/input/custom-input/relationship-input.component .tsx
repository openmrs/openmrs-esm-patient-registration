import React, { useState, useEffect, Fragment } from 'react';
import styles from './../input.css';
import { SelectInput } from './select-input.component';
import { getAllRelationshipTypes, getPerson } from '../../patient-registration.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { FieldArray } from 'formik';
import Autosuggest from 'react-autosuggest';
//import styles from './autosuggest.css';

interface RelationshipInputProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
}

export const RelationshipInput: React.FC<RelationshipInputProps> = ({ setFieldValue }) => {
  const [relationshipTypesOptions, setRelationshipTypesOptions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getAllRelationshipTypes(abortController).then(({ data }) => {
      data.results.map(option => {
        setRelationshipTypesOptions(relationshipTypesOptions => [
          ...relationshipTypesOptions,
          { uuid: option.uuid + '-A', display: option.aIsToB },
        ]);
        setRelationshipTypesOptions(relationshipTypesOptions => [
          ...relationshipTypesOptions,
          { uuid: option.uuid + '-B', display: option.bIsToA },
        ]);
      });
    }, createErrorHandler());
    return () => abortController.abort();
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [personName, setPersonName] = useState([]);

  const handleSearch = query => {
    const abortController = new AbortController();
    getPerson(abortController, query.value).then(({ data }) => {
      const suggestions = data.results.map(i => ({
        id: i.uuid,
        display: i.display,
      }));
      const truncatedSuggestions = suggestions.slice(0, 5);

      setSuggestions(truncatedSuggestions);
    }, createErrorHandler());
  };

  return (
    <div>
      <FieldArray name="relationships">
        {fieldArrayProps => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { relationships } = values;
          return (
            <main className={styles.field}>
              {relationships.map((relationship, index) => (
                <section key={index} className={styles.fieldRow}>
                  <SelectInput name={`relationships[${index}].type`} options={relationshipTypesOptions} />
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsClearRequested={() => {
                      setSuggestions([]);
                    }}
                    getSuggestionValue={suggestion => {
                      return suggestion.id;
                    }}
                    renderSuggestion={suggestion => {
                      return <span>{suggestion.display}</span>;
                    }}
                    inputProps={{
                      placeholder: 'Person name',
                      name: `relationships[${index}].name`,
                      value: personName[index] ? personName[index] : '',
                      onChange: (_event, { newValue }) => {
                        if (index < personName.length) {
                          const personNameList = personName.splice(index, 1, newValue);
                          setPersonName(personName);
                        } else {
                          const personNameList = personName.concat(newValue);
                          setPersonName(personNameList);
                        }
                      },
                    }}
                    shouldRenderSuggestions={value => {
                      return value.trim().length > 2;
                    }}
                    onSuggestionsFetchRequested={handleSearch}
                    onSuggestionSelected={(_event, { suggestion, method }) => {
                      if (method === 'enter') {
                        event.preventDefault();
                      }
                      if (index < personName.length) {
                        const personNameList = personName.splice(index, 1, suggestion.display);
                        setPersonName(personName);
                      } else {
                        const personNameList = personName.concat(suggestion.display);
                        setPersonName(personNameList);
                      }
                      setFieldValue(`relationships[${index}].name`, suggestion.display);
                      setFieldValue(`relationships[${index}].uuid`, suggestion.id);
                      setSuggestions([]);
                    }}
                  />
                  <div className="omrs-increment-buttons">
                    {index > 0 && (
                      <button
                        type="button"
                        className="omrs-btn-icon-medium"
                        onClick={() => {
                          const personNameList = personName.splice(index, 1);
                          setPersonName(personName);
                          remove(index);
                        }}>
                        -
                      </button>
                    )}
                    <button
                      type="button"
                      className="omrs-btn-icon-medium"
                      onClick={() => push({ uuid: '', name: '', type: '' })}>
                      +
                    </button>
                  </div>
                </section>
              ))}
            </main>
          );
        }}
      </FieldArray>
    </div>
  );
};
