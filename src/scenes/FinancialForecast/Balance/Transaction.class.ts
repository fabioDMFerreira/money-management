import { sumMonths, monthDiff } from "./utils";
import TransactionData from "../TransactionData.interface";

import YYYYMMDD from 'utils/YYYYMMDD';
import getRandomString from "utils/getRandomString";

export default class Transaction {
  id: string;
  description: string;
  _startDate: Date;
  _endDate: Date;
  _interval: number;
  _particles: number;
  _value: number;
  _totalValue: number;

  constructor(description: string, value: number, startDate?: Date) {
    this.description = description;
    this._startDate = startDate || new Date();
    this._endDate = this._startDate;

    this._value = value;
    this._particles = 1;
    this._totalValue = value * this._particles;
    this._interval = 1;
    this.id = getRandomString();
  }

  set particles(particles: number) {
    if (this._interval === 1) {
      this._endDate = sumMonths(this._endDate, particles - this._particles)
    }
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

    this._interval = 1;
    this._particles = monthDiff(this.startDate, date);
    this._endDate = date;
    this.value = this._totalValue / this._particles;
  }

  get endDate(): Date {
    return this._endDate;
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

    if (this._startDate === this._endDate) {
      this._endDate = date;
    }

    this._startDate = date;
    this._particles = monthDiff(this.startDate, this.endDate);
    this._value = this._totalValue / this._particles;
  }

  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
    this._endDate = this._startDate;
  }

  static buildFromTransactionData(transactionData: TransactionData): Transaction {

    let value;

    if (transactionData.credit) {
      value = +transactionData.credit;
    } else if (transactionData.debit) {
      value = -(+transactionData.debit);
    } else {
      value = 0;
    }

    const startDate = transactionData.startDate ? new Date(transactionData.startDate) : new Date();

    const transaction = new this(transactionData.description, value, startDate);

    return transaction;
  }

  convertToTransactionData(): TransactionData {
    return {
      id: this.id,
      description: this.description,
      credit: '' + (this.value > 0 ? this.value : 0),
      debit: '' + (this.value < 0 ? this.value * -1 : 0),
      particles: '' + this.particles,
      interval: '' + this.interval,
      startDate: YYYYMMDD(this.startDate),
      endDate: YYYYMMDD(this.endDate),
      totalValue: '' + this.totalValue,
    }
  }

}
