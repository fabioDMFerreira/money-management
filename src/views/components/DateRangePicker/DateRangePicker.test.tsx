import 'react-dates/initialize';

import { fireEvent, prettyDOM, render } from '@testing-library/react';
import React from 'react';

import DateRangePicker from '.';


describe('components/DateRangePicker', () => {
  it('should set correct start and end dates values and call update functions when dates values are updated', () => {
    const updateStartDate = jest.fn();
    const updateEndDate = jest.fn();

    const { queryByDisplayValue, container } = render(<DateRangePicker
      startDate="2020-01-02"
      endDate="2020-01-07"
      updateStartDate={updateStartDate}
      updateEndDate={updateEndDate}
    />);

    console.log(prettyDOM(container));

    const startDateInput = queryByDisplayValue('2020-01-02');
    const endDateInput = queryByDisplayValue('2020-01-07');

    expect(startDateInput).toBeTruthy();
    expect(endDateInput).toBeTruthy();

    if (startDateInput) {
      fireEvent.change(startDateInput, {
        target: {
          value: '2020-01-03',
        },
      });

      expect(updateStartDate).toBeCalledTimes(1);
      expect(updateStartDate.mock.calls[0][0]).toEqual('2020-01-03');
    }

    if (endDateInput) {
      fireEvent.change(endDateInput, {
        target: {
          value: '2020-01-08',
        },
      });

      expect(updateEndDate).toBeCalledTimes(1);
      expect(updateEndDate.mock.calls[0][0]).toEqual('2020-01-08');
    }
  });
});
