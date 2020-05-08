import { Balance } from 'models/Balance';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

import calculateWalletsTransactionsBalance from './calculateWalletsTransactionsBalance';

export default (transactionsData: TransactionConfig[] = [], estimatesData: TransactionConfig[] = [], wallets: Wallet[]): Balance[] => {
  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));
  const estimates: Transaction[] =
    estimatesData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  const startDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.startDate.getTime());
  const endDates =
    transactions.concat(estimates)
      .map((transaction: Transaction) => (transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime()));

  const minDate = new Date(Math.min.apply(null, startDates));
  const maxDate = new Date(Math.max.apply(null, endDates));


  const transactionsBalance = calculateWalletsTransactionsBalance(transactionsData, wallets, minDate, maxDate);
  const estimatesBalance = calculateWalletsTransactionsBalance(estimatesData, wallets);

  transactionsBalance.forEach((monthBalance: Balance, index) => {
    const monthBalanceDate = monthBalance.date ? YYYYMMDD(monthBalance.date) : '';
    const estimate =
      estimatesBalance.find((month: Balance) => (!!(monthBalance.date && month.date && YYYYMMDD(month.date) === monthBalanceDate)));

    const previousBalance = transactionsBalance[index - 1];

    if (!monthBalance.actualValue && previousBalance) {
      monthBalance.actualValue = previousBalance.actualValue;
    }

    if (!estimate) {
      monthBalance.estimateValue = monthBalance.actualValue;
    } else if (estimate && estimate.actualValue && previousBalance && previousBalance.estimateValue) {
      monthBalance.estimateValue = previousBalance.estimateValue + estimate.balance;
    } else if (estimate && monthBalance && monthBalance.actualValue) {
      monthBalance.estimateValue = monthBalance.actualValue + estimate.balance;
    }
  });

  return transactionsBalance;
};
