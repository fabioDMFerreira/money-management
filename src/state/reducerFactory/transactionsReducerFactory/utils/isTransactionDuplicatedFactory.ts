import { TransactionConfig } from 'models/Transaction/TransactionConfig';


export default (allTransactions: TransactionConfig[]) =>
  (transaction: TransactionConfig): boolean =>
    allTransactions.some(listTransaction =>
      listTransaction.totalValue === transaction.totalValue &&
        listTransaction.startDate === transaction.startDate);
