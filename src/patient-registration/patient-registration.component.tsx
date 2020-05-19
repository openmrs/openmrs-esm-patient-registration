import React from 'react';
import PatientName from './widgets/patient-name/patient-name.component';
import DateOfBirth from './widgets/date-of-birth/date-of-birth.component';
import styles from './patient-registration.css';

class PatientRegistration extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      dateOfBirth: '',
      estimatedDateOfBirth: false,
      isNameUnknown: false,
    };
  }

  setDateOfBirth = (date: string) => {
    this.setState({
      dateOfBirth: date,
    });
  };

  setEstimatedDateOfBirth = (estimate: boolean) => {
    this.setState({
      estimatedDateOfBirth: estimate,
    });
  };

  setNameUnknown = (name_unknown: boolean) => {
    this.setState({
      isNameUnknown: name_unknown,
    });
  };

  render() {
    return (
      <form className={`omrs-margin-8 omrs-padding-8 ${styles.dashboard}`}>
        <h1 className="omrs-type-title-1">New Patient</h1>
        <section className={styles.widget}>
          <PatientName setNameUnknown={this.setNameUnknown} />
        </section>
        <section className={styles.widget}>
          <DateOfBirth setDate={this.setDateOfBirth} setEstimate={this.setEstimatedDateOfBirth} />
        </section>
      </form>
    );
  }
}

export default PatientRegistration;
