import React from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-components-react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';

export const GenderField: React.FC = () => {
  const { t } = useTranslation();
  const { setFieldValue } = React.useContext(PatientRegistrationContext);

  const setGender = (value: string) => {
    console.log('Gender selected ', value);
    setFieldValue(value);
  };

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('genderLabelText')}</h4>
      <div style={{ marginBottom: '1rem' }}>
        <p className="bx--label">{t('sexLabelText')}</p>
        <RadioButtonGroup name="gender" orientation="vertical" onChange={setGender}>
          <RadioButton id="male" labelText="Male" value="Male" />
          <RadioButton id="female" labelText="Female" value="Female" />
          <RadioButton id="other" labelText="Other" value="Other" />
        </RadioButtonGroup>
      </div>
    </div>
  );
};
