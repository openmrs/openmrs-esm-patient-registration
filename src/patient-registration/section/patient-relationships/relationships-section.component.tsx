import React, { useEffect, useState } from 'react';
import sectionStyles from '../section.scss';
import { FieldArray } from 'formik';
import { Select, SelectItem, Button } from 'carbon-components-react';
import styles from './relationships.scss';
import { Autosuggest } from '../../input/custom-input/autosuggest/autosuggest.component';
import { getAllRelationshipTypes } from '../../patient-registration.resource';
import { openmrsFetch } from '@openmrs/esm-api';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';

interface RelationshipType {
  display: string;
  uuid: string;
  direction: string;
}

export const RelationshipsSection: React.FC = () => {
  const [relationshipTypes, setRelationshipTypes] = useState<RelationshipType[]>([]);
  const { setFieldValue } = React.useContext(PatientRegistrationContext);
  const { t } = useTranslation();

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
        aIsToB.display === bIsToA.display ? tmp.push(aIsToB) : tmp.push(aIsToB, bIsToA);
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
                  {relationships.map((_relationship: any, index: React.Key) => (
                    <div key={index} className={styles.relationship}>
                      <div className={styles.searchBox} style={{ marginBottom: '1rem' }}>
                        <Autosuggest
                          name={`relationships[${index}].relatedPerson`}
                          placeholder="Find person"
                          onSuggestionSelected={handleSuggestionSelected}
                          getSearchResults={searchPerson}
                          getDisplayValue={item => item.display}
                          getFieldValue={item => item.uuid}
                        />
                      </div>
                      <div className={`${styles.selectRelationshipType}`} style={{ marginBottom: '1rem' }}>
                        <Select
                          light={true}
                          id="select"
                          defaultValue="placeholder-item"
                          labelText={t('Relationship')}
                          onChange={handleRelationshipTypeChange}
                          name={`relationships[${index}].relationship`}>
                          <SelectItem disabled hidden value="placeholder-item" text={t('relationshipToPatient')} />
                          {relationshipTypes.map(type => (
                            <SelectItem text={type.display} value={`${type.uuid}/${type.direction}`} />
                          ))}
                        </Select>
                      </div>
                      <div className={styles.actions}>
                        {relationships.length - 1 === index && (
                          <Button kind="ghost" onClick={() => push({})}>
                            {t('addRelationshipButtonText')}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </FieldArray>
      </section>
    </section>
  );
};
