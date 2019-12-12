import { List } from 'immutable';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';


export default (allTransactions: List<TransactionConfig>) =>
  (transaction: TransactionConfig): boolean =>
    !allTransactions.some((listTransaction) => {
      if (!listTransaction) {
        return false;
      }

      return listTransaction.totalValue === transaction.totalValue &&
        listTransaction.startDate === transaction.startDate;
    });
