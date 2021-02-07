import React from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-components-react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';

export const GenderField: React.FC = () => {
  const { t } = useTranslation();
  const { setFieldValue } = React.useContext(PatientRegistrationContext);

  const setGender = e => {
    setFieldValue('gender', e.target.value);
  };

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('genderLabelText')}</h4>
      <div style={{ marginBottom: '1rem' }}>
        <p className="bx--label">{t('sexLabelText')}</p>
        {/* <RadioButtonGroup name="gender" orientation="vertical" >
          <RadioButton id="male" labelText={t('Male')} value="Male" onChange={setGender} />
          <RadioButton id="female" labelText={t('Female')} value="Female" onChange={setGender} />
          <RadioButton id="other" labelText={t('Other')} value="Other" onChange={setGender} />
        </RadioButtonGroup> */}
        <div>
          <input type="radio" id="male" name="gender" value="Male" onChange={setGender} />
          <label htmlFor="male">Male</label>
          <br />
          <input type="radio" id="female" name="gender" value="Female" onChange={setGender} />
          <label htmlFor="female">Female</label>
          <br />
          <input type="radio" id="other" name="gender" value="Other" onChange={setGender} />
          <label htmlFor="other">Other</label>
          <br />
        </div>
      </div>
    </div>
  );
};
