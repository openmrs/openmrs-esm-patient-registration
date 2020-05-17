import React from 'react';
import styles from './age.css';

interface IProps {}

interface IState {
  years: number;
  months: number;
  days: number;
}

class Age extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      years: 0,
      months: 0,
      days: 0,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsNumber >= 0) {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.valueAsNumber,
      });
    }
  };

  render() {
    return (
      <main className={styles.container}>
        <label htmlFor="age" className="omrs-margin-right-4 age">
          Age
        </label>
        <section className={styles.item}>
          <div>
            <label className="omrs-margin-right-4 years" htmlFor="years">
              Years
            </label>
            <input type="number" value={this.state.years} name="years" min="0" onChange={this.handleInputChange} />
          </div>
        </section>
        <section className={styles.item}>
          <div>
            <label className="omrs-margin-right-4 months" htmlFor="months">
              Months
            </label>
            <input type="number" value={this.state.months} name="months" min="0" onChange={this.handleInputChange} />
          </div>
        </section>
        <section className={styles.item}>
          <label className="omrs-margin-right-4 days" htmlFor="days">
            Days
          </label>
          <input type="number" value={this.state.days} name="days" min="0" onChange={this.handleInputChange} />
        </section>
      </main>
    );
  }
}

export default Age;
