import React from 'react';
import styles from './patient-name.css';

interface IProps {
  setNameUnknown: (name_unknown: boolean) => void;
}

interface IState {
  first_name: String;
  middle_name: String;
  last_name: String;
  name_unknown: boolean;
}

class PatientName extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      name_unknown: false,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleNameUnknownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name_unknown: e.target.checked,
    });
    this.props.setNameUnknown(e.target.checked);

    if (e.target.checked) {
      this.setNamesToBlank();
    }
  };

  setNamesToBlank = () => {
    this.setAllNames('');
  };

  setAllNames = (name: String) => {
    this.setState({
      first_name: name,
      middle_name: name,
      last_name: name,
    });
  };

  render() {
    return (
      <main className={styles.container}>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input
              type="text"
              value={this.state.first_name.toString()}
              name="first_name"
              className="omrs-input-underlined"
              disabled={this.state.name_unknown}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="first_name" className="omrs-margin-right-4 first_name">
              First Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input
              type="text"
              value={this.state.middle_name.toString()}
              name="middle_name"
              className="omrs-input-underlined"
              disabled={this.state.name_unknown}
              onChange={this.handleInputChange}
            />
            <label htmlFor="middle_name" className="omrs-margin-right-4 middle_name">
              Middle Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-input-group">
            <input
              type="text"
              value={this.state.last_name.toString()}
              name="last_name"
              className="omrs-input-underlined"
              disabled={this.state.name_unknown}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="last_name" className="omrs-margin-right-4 last_name">
              Last Name
            </label>
          </div>
        </section>
        <section className={styles.item}>
          <div className="omrs-checkbox">
            <label>
              <input
                type="checkbox"
                name="omrs-checkbox"
                checked={this.state.name_unknown}
                onChange={this.handleNameUnknownChange}
              />
              <span className="omrs-margin-left-4 name_unknown">Name unknown</span>
            </label>
          </div>
        </section>
      </main>
    );
  }
}

export default PatientName;
