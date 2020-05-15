import React from 'react';
import DateOfBirth from './widgets/date-of-birth/date-of-birth.component';

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
      <form className="omrs-margin-8 omrs-padding-8">
        <h1 className="omrs-type-title-1">New Patient</h1>
        <section className="omrs-margin-8 omrs-padding-8">
          <DateOfBirth setDate={this.setDateOfBirth} />
        </section>
      </form>
    );
  }
}

export default PatientRegistration;
