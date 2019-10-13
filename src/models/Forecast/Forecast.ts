interface Options {
  initialValue?: number
  endValue?: number
}

export default class Forecast {

  startDate: Date;
  endDate: Date;
  initialValue: number;
  endValue: number;

  constructor(startDate: Date, endDate: Date, { initialValue, endValue }: Options) {
    this.startDate = startDate;
    this.endDate = endDate;
    if (initialValue && endValue) {
      throw new Error(`initialValue and endValue can't be set mutually`)
    }
    this.initialValue = initialValue || 0;
    this.endValue = endValue || 0;
  }

};
