import React from 'react';
import styles from './patient-name.css';

interface IProps {}

interface IState {}

class PatientName extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className={styles.container}>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input type="text" name="first_name" className="omrs-input-underlined" required />
            <label htmlFor="first_name" className="omrs-margin-right-4 first_name">
              First Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input type="text" name="middle_name" className="omrs-input-underlined" />
            <label htmlFor="middle_name" className="omrs-margin-right-4 middle_name">
              Middle Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input type="text" name="last_name" className="omrs-input-underlined" required />
            <label htmlFor="last_name" className="omrs-margin-right-4 last_name">
              Last Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-checkbox">
            <label>
              <input type="checkbox" name="omrs-checkbox" />
              <span className="omrs-margin-left-4 name_unknown">Name unknown</span>
            </label>
          </div>
        </section>
      </main>
    );
  }
}

export default PatientName;
