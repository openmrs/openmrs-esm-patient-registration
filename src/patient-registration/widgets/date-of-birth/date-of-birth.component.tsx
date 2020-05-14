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
      <div className="DateOfBirthContainer">
        <label htmlFor="DateOfBirth">Date of Birth:</label>
        <input className="DateOfBirthDatePicker" type="date" value={this.state.date} onChange={this.handleDateChange} />
      </div>
    );
  }
}

export default DateOfBirth;
