import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { monthDiff, sumMonths } from 'utils/dateUtils';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';
import getRandomString from 'utils/getRandomString';

export type RecurringTransactionType = 'contract' | 'budget';

export interface RecurringTransactionConfig {
  id?: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  times?: number;
  interval?: number;
  valuePerTime?: number;
  totalValue?: number;
  useTotalValue?: boolean;
  useEndDate?: boolean;
  tags?: string[];
  wallet?: string;
  transactionsIds?: string[];
  type: RecurringTransactionType;
}

interface RecurringTransactionInterface {
  isValid: () => boolean;
  generateTransactions: () => TransactionConfig[];

  transactionsRefs: Transaction[];

  data: RecurringTransactionConfig;
}

export class RecurringTransaction implements RecurringTransactionInterface {
  transactionsRefs: Transaction[] = [];
  data: RecurringTransactionConfig;

  constructor(data: RecurringTransactionConfig) {
    this.data = data;

    if (!this.data.useEndDate && this.data.times) {
      this.data.endDate = sumMonths(this.data.startDate, this.data.times - 1);
    } else if (this.data.endDate) {
      this.data.times = monthDiff(this.data.startDate, this.data.endDate);
    }

    this.data.times = this.data.times || 1;
    this.data.interval = this.data.interval || 1;

    if (!this.data.useTotalValue && this.data.valuePerTime) {
      this.data.totalValue = this.data.valuePerTime * this.data.times;
    } else if (this.data.totalValue && this.data.times) {
      this.data.valuePerTime = this.data.totalValue / this.data.times;
    }

    this.data.interval = this.data.interval || 1;
  }

  isValid() {
    if (!this.data.description) {
      return false;
    }

    if (this.data.useTotalValue && !this.data.totalValue) {
      return false;
    } else if (!this.data.useTotalValue && !this.data.valuePerTime) {
      return false;
    }

    if (this.data.useEndDate && !this.data.endDate) {
      return false;
    } else if (!this.data.times) {
      return false;
    }

    return true;
  }

  generateTransactions() {
    const transactions: TransactionConfig[] = [];
    let valuePerTime = 0;
    let times;
    let cursorDate = this.data.startDate;
    let totalValue = 0;

    const interval = this.data.interval || 1;

    if (!this.isValid()) {
      throw new Error('Invalid recurring transaction');
    }

    if (this.data.useEndDate && this.data.endDate) {
      times = Math.floor(monthDiff(this.data.startDate, this.data.endDate) / interval);
    } else {
      times = this.data.times || 1;
    }

    if (!this.data.valuePerTime && !this.data.totalValue) {
      return [];
    }

    if (this.data.useTotalValue && this.data.totalValue) {
      totalValue = this.data.totalValue;
      valuePerTime = this.data.totalValue / times;
    } else if (this.data.valuePerTime) {
      totalValue = this.data.valuePerTime * times;
      valuePerTime = this.data.valuePerTime;
    }


    while (times) {
      transactions.push({
        id: getRandomString(),
        description: this.data.description,
        startDate: YYYYMMDD(cursorDate),
        credit: valuePerTime > 0 ? valuePerTime.toString() : '0',
        debit: valuePerTime < 0 ? (valuePerTime * -1).toString() : '0',
        totalValue: totalValue.toString(),
        particles: '1',
        tags: this.data.tags,
        wallet: this.data.wallet,
      });
      cursorDate = sumMonths(cursorDate, interval);
      times--;
    }

    return transactions;
  }
}
