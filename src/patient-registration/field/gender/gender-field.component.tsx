import React from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-components-react';
import styles from '../field.scss';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

export const GenderField: React.FC = () => {
  const [field, meta] = useField('gender');
  const { t } = useTranslation();

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('genderLabelText')}</h4>
      <div style={{ marginBottom: '1rem' }}>
        <p className="bx--label">{t('sexLabelText')}</p>
        <RadioButtonGroup name="gender" orientation="vertical" {...field}>
          <RadioButton id="male" labelText="Male" value="male" />
          <RadioButton id="female" labelText="Female" value="female" />
          <RadioButton id="other" labelText="Other" value="other" />
        </RadioButtonGroup>
      </div>
    </div>
  );
};
