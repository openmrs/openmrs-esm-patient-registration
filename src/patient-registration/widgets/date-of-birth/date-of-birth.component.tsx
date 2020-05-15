import React from 'react';

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
      date: 'dd/mm/yyyy',
      estimate: false,
    };
  }

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      date: e.target.value,
    });

    this.props.setDate(e.target.value);
  };

  handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      estimate: e.target.checked,
    });

    this.props.setEstimate(e.target.checked);
  };

  render() {
    return (
      <div className="omrs-margin-8 omrs-padding-8 container">
        <div className="field">
          <label className="omrs-type-title-4 omrs-margin-right-4" htmlFor="date-of-birth">
            Date of Birth
          </label>
          <div className="omrs-datepicker">
            <input type="date" name="datepicker" value={this.state.date} onChange={this.handleDateChange} required />
            <svg className="omrs-icon" role="img">
              <use xlinkHref="#omrs-icon-calendar"></use>
            </svg>
          </div>
        </div>
        <div className="field">
          <div className="omrs-checkbox">
            <label>
              <input
                type="checkbox"
                name="omrs-checkbox"
                checked={this.state.estimate}
                onChange={this.handleEstimateChange}
              />
              <span className="omrs-type-title-5 omrs-margin-left-4">Estimate</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default DateOfBirth;
