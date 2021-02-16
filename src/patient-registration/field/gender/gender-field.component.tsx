import React from 'react';
import RadioButton from 'carbon-components-react/es/components/RadioButton';
import RadioButtonGroup from 'carbon-components-react/es/components/RadioButtonGroup';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';

export const GenderField: React.FC = () => {
  const { t } = useTranslation();
  const { setFieldValue } = React.useContext(PatientRegistrationContext);

  const setGender = (gender: string) => {
    setFieldValue('gender', gender);
  };

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('genderLabelText')}</h4>
      <div style={{ marginBottom: '1rem' }}>
        <p className="bx--label">{t('sexLabelText')}</p>
        <RadioButtonGroup name="gender" orientation="vertical" onChange={setGender}>
          <RadioButton id="male" labelText={t('Male')} value="Male" />
          <RadioButton id="female" labelText={t('Female')} value="Female" />
          <RadioButton id="other" labelText={t('Other')} value="Other" />
        </RadioButtonGroup>
      </div>
    </div>
  );
};
