import { sumMonths, monthDiff } from "./utils";

export default class Transaction {
  description: string;
  _startDate: Date;
  _endDate?: Date;
  _particles: number;
  _value: number;
  _totalValue: number;

  constructor(description: string, value: number, startDate: Date | undefined, endDate?: Date) {
    this.description = description;
    this._startDate = startDate || new Date();

    if (endDate) {
      this._endDate = endDate;
      }

    this._value = value;
    this._particles = endDate ? monthDiff(this._startDate, endDate) : 1;
    this._totalValue = value * this._particles;
  }

  set particles(particles: number) {
    this._endDate = sumMonths(this._endDate || this._startDate, particles - this._particles)
    this._particles = particles;
    this.value = this._totalValue / particles;
  }

  get particles(): number {
    return this._particles;
  }

  set endDate(date: Date) {
    if (date < this._startDate) {
      this._startDate = date;
    }

    this._particles = monthDiff(this.startDate, date);
    this._endDate = date;
    this.value = this._totalValue / this._particles;
  }

  get endDate(): Date {
    return this._endDate || this._startDate;
  }

  set value(value: number) {
    this._value = value;
    this._totalValue = value * this._particles;
  }

  get value(): number {
    return this._value;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  set totalValue(value: number) {
    this._totalValue = value;
    this._value = value / this._particles;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(date: Date) {
    if (this._endDate && date > this._endDate) {
      this._endDate = date;
    }

    this._startDate = date;
    this._particles = monthDiff(this.startDate, this.endDate);
    this._value = this._totalValue / this._particles;
  }

}
