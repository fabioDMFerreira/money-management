
import moment from 'moment';
import React, { Component } from 'react';
import { DateRangePicker as DateRangePickerComponent } from 'react-dates';


type Props = {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  updateStartDate: (date: string | null | undefined) => any;
  updateEndDate: (date: string | null | undefined) => any;
}

type State = {
  dateRangeFocused: 'startDate' | 'endDate' | null;
}

export default class DateRangePicker extends Component<Props, State> {
  state = {
    dateRangeFocused: null,
  }

  render() {
    const {
      startDate, endDate, updateStartDate, updateEndDate,
    } = this.props;
    const { dateRangeFocused } = this.state;

    return (
      <DateRangePickerComponent
        showClearDates
        isOutsideRange={() => false}
        startDate={startDate ? moment(startDate) : null}
        startDateId="dates-range-start-date"
        endDate={endDate ? moment(endDate) : null}
        endDateId="dates-range-global-filter-end-date"
        onDatesChange={
          ({ startDate: newStartDate, endDate: newEndDate }) => {
            if ((!newStartDate && startDate) || (newStartDate && newStartDate.format('YYYY-MM-DD') !== startDate)) {
              updateStartDate(newStartDate && newStartDate.format('YYYY-MM-DD'));
            }
            if ((!newEndDate && endDate) || (newEndDate && newEndDate.format('YYYY-MM-DD') !== endDate)) {
              updateEndDate(newEndDate && newEndDate.format('YYYY-MM-DD'));
            }
          }
        }
        focusedInput={dateRangeFocused}
        onFocusChange={dateRangeFocused => this.setState({ dateRangeFocused })}
        displayFormat="YYYY-MM-DD"
      />
    );
  }
}
