import React from 'react';
import DateOfBirth from './widgets/date-of-birth/date-of-birth.component';
import styles from './patient-registration.css';

class PatientRegistration extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      dateOfBirth: '',
    };
  }

  setDateOfBirth = (date: string) => {
    this.setState({
      dateOfBirth: date,
    });
  };

  render() {
    return (
      <main className={styles.container}>
        <section className={styles.item}>
          <DateOfBirth setDate={this.setDateOfBirth} />
        </section>
      </main>
    );
  }
}

export default PatientRegistration;
