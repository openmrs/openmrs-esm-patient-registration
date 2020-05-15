import React from 'react';

interface IProps {
  setDate: (date: string) => void;
}

interface IState {
  date: string;
}

class DateOfBirth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: 'dd/mm/yyyy',
    };
  }

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      date: e.target.value,
    });

    this.props.setDate(e.target.value);
  };

  render() {
    return (
      <div className="omrs-margin-8 omrs-padding-8">
        <label className="omrs-type-title-5 omrs-margin-right-4" htmlFor="date-of-birth">
          Date of Birth:
        </label>
        <div className="omrs-datepicker">
          <input type="date" name="datepicker" value={this.state.date} onChange={this.handleDateChange} required />
          <svg className="omrs-icon" role="img">
            <use xlinkHref="#omrs-icon-calendar"></use>
          </svg>
        </div>
      </div>
    );
  }
}

export default DateOfBirth;
