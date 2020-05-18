import React from 'react';
import Age from './age.component';
import styles from './date-of-birth.css';

interface IProps {
  setDate: (date: string) => void;
  setEstimate: (estimate: boolean) => void;
}

interface IState {
  date: string;
  estimate: boolean;
}

class DateOfBirth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: '',
      estimate: false,
    };
  }

  getTodaysDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value <= this.getTodaysDate()) {
      this.setState({
        date: e.target.value,
      });

      this.props.setDate(e.target.value);
    }
  };

  handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      estimate: e.target.checked,
    });

    this.props.setEstimate(e.target.checked);
  };

  handleBirthTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  render() {
    return (
      <main className={`omrs-margin-8 omrs-padding-8 ${styles.container}`}>
        <section className={styles.item}>
          <label htmlFor="date-of-birth" className="omrs-margin-right-4">
            Date of Birth *
          </label>
          <div className="omrs-datepicker">
            <input
              type="date"
              name="datepicker"
              value={this.state.date}
              max={this.getTodaysDate()}
              onChange={this.handleDateChange}
              required
            />
            <svg className="omrs-icon" role="img">
              <use xlinkHref="#omrs-icon-calendar"></use>
            </svg>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-checkbox">
            <label>
              <input
                type="checkbox"
                name="omrs-checkbox"
                checked={this.state.estimate}
                onChange={this.handleEstimateChange}
              />
              <span className="omrs-margin-left-4 estimate">Estimate</span>
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <Age />
        </section>
      </main>
    );
  }
}

export default DateOfBirth;
