export default class Forecast {

  startDate: Date;
  endDate: Date;
  initialValue: number;

  constructor(startDate: Date, endDate: Date, initialValue: number) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.initialValue = initialValue;
  }

};
