import React from 'react';
import moment from 'moment';
import styles from './life-span.css';

require('moment-precise-range-plugin');

interface LifeSpanProps {}

interface LifeSpanState {
  dateOfBirth: string;
  birthTime: string;
  age: { years: number; months: number; days: number };
  estimate: boolean;
}

class LifeSpan extends React.Component<LifeSpanProps, LifeSpanState> {
  constructor(props: LifeSpanProps) {
    super(props);

    this.state = {
      dateOfBirth: '',
      birthTime: '',
      age: {
        years: 0,
        months: 0,
        days: 0,
      },
      estimate: false,
    };
  }

  handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dateOfBirth = moment(event.target.value, 'YYYY-MM-DD');
    let difference = moment().preciseDiff(dateOfBirth, true);

    this.setState({
      dateOfBirth: event.target.value,
      age: { years: difference.years, months: difference.months, days: difference.days },
    });
  };

  handleBirthTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      birthTime: event.target.value,
    });
  };

  handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        age: {
          ...this.state.age,
          [event.target.name]: event.target.value,
        },
      },
      () => {
        this.updateDateOfBirth();
      },
    );
  };

  updateDateOfBirth() {
    let difference = moment()
      .subtract(this.state.age.years, 'years')
      .subtract(this.state.age.months, 'months')
      .subtract(this.state.age.days, 'days');

    this.setState({
      dateOfBirth: difference.toISOString().split('T')[0],
    });
  }

  handleEstimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      estimate: event.target.checked,
    });
  };

  render() {
    return (
      <main className={styles.container}>
        <section className={styles.itemDateOfBirth}>
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            type="date"
            id="date-of-birth"
            name="date-of-birth"
            value={this.state.dateOfBirth}
            onChange={this.handleDateOfBirthChange}
          />
        </section>
        <section className={styles.itemBirthTime}>
          <label htmlFor="birth-time">Birth Time</label>
          <input
            type="time"
            id="birth-time"
            name="birth-time"
            value={this.state.birthTime}
            onChange={this.handleBirthTimeChange}
          />
        </section>
        <section className={styles.itemAge}>
          <label htmlFor="age">Age</label>
          <label className={styles.ageLabel} htmlFor="years">
            Years
          </label>
          <input
            className={styles.ageInput}
            type="number"
            id="years"
            name="years"
            value={this.state.age.years}
            onChange={this.handleAgeChange}
          />
          <label className={styles.ageLabel} htmlFor="months">
            Months
          </label>
          <input
            className={styles.ageInput}
            type="number"
            id="months"
            name="months"
            value={this.state.age.months}
            onChange={this.handleAgeChange}
          />
          <label className={styles.ageLabel} htmlFor="days">
            Days
          </label>
          <input
            className={styles.ageInput}
            type="number"
            id="days"
            name="days"
            value={this.state.age.days}
            onChange={this.handleAgeChange}
          />
        </section>
        <section className={styles.itemEstimate}>
          <label htmlFor="estimate">Estimate</label>
          <input
            type="checkbox"
            id="estimate"
            name="estimate"
            checked={this.state.estimate}
            onChange={this.handleEstimateChange}
          />
        </section>
      </main>
    );
  }
}

export default LifeSpan;
