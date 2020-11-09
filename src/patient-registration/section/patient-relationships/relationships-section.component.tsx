import React, { useEffect, useState } from 'react';
import sectionStyles from '../section.css';
import { useTranslation } from 'react-i18next';
import { FieldArray } from 'formik';
import { Select, SelectItem, Button } from 'carbon-components-react';
import styles from './relationships.css';
import { Autosuggest } from '../../input/custom-input/autosuggest/autosuggest.component';
import { getAllRelationshipTypes } from '../../patient-registration.resource';
import { openmrsFetch } from '@openmrs/esm-api';

interface RelationshipType {
  display: string;
  uuid: string;
  direction: string;
}

interface RelationshipsSectionProps {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
}

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({ setFieldValue }) => {
  const { t } = useTranslation();
  const [relationshipTypes, setRelationshipTypes] = useState<RelationshipType[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    getAllRelationshipTypes(abortController).then(({ data: { results } }) => {
      const tmp: RelationshipType[] = [];
      results.forEach(type => {
        const aIsToB = {
          display: type.aIsToB,
          uuid: type.uuid,
          direction: 'aIsToB',
        };
        const bIsToA = {
          display: type.bIsToA,
          uuid: type.uuid,
          direction: 'bIsToA',
        };
        tmp.push(aIsToB, bIsToA);
      });
      setRelationshipTypes(tmp);
    });
  }, []);

  const handleRelationshipTypeChange = event => {
    const { target } = event;
    const field = target.name;
    const value = target.options[target.selectedIndex].value;
    setFieldValue(field, value);
  };

  const handleSuggestionSelected = (field: string, selectedSuggestion: string) => {
    setFieldValue(field, selectedSuggestion);
  };

  const searchPerson = async (query: string) => {
    const abortController = new AbortController();
    const searchResults = await openmrsFetch(`/ws/rest/v1/person?q=${query}`, {
      signal: abortController.signal,
    });
    return searchResults.data.results;
  };

  return (
    <section className={sectionStyles.formSection} aria-label="Relationships Section">
      <h5 className="omrs-type-title-5">{t('relationshipsSectionHeader')}</h5>
      <section className={sectionStyles.fieldGroup}>
        <FieldArray name="relationships">
          {({
            push,
            remove,
            form: {
              values: { relationships },
            },
          }) => (
            <div>
              {relationships && relationships.length > 0 ? (
                <div>
                  <br />
                  {relationships.map((relationship, index) => (
                    <div key={index}>
                      <div className={styles.searchBox}>
                        <Autosuggest
                          name={`relationships[${index}].relatedPerson`}
                          placeholder="Find person"
                          onSuggestionSelected={handleSuggestionSelected}
                          getSearchResults={searchPerson}
                          getDisplayValue={item => item.display}
                          getFieldValue={item => item.uuid}
                        />
                      </div>
                      <span className={styles.label}>Is a</span>
                      <div className={styles.selectRelationshipType}>
                        <Select
                          id="select"
                          defaultValue="placeholder-item"
                          noLabel={true}
                          onChange={handleRelationshipTypeChange}
                          name={`relationships[${index}].relationship`}>
                          <SelectItem disabled hidden value="placeholder-item" text="Select Relationship Type" />
                          {relationshipTypes.map(type => (
                            <SelectItem text={type.display} value={`${type.uuid}/${type.direction}`} />
                          ))}
                        </Select>
                      </div>
                      <button className="omrs-btn-icon-medium" onClick={() => remove(index)} type="button">
                        -
                      </button>
                      <button className="omrs-btn-icon-medium" onClick={() => push({})} type="button">
                        +
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <br />
                  <Button onClick={() => push({})}>Add Relationship</Button>
                </div>
              )}
            </div>
          )}
        </FieldArray>
      </section>
    </section>
  );
};
