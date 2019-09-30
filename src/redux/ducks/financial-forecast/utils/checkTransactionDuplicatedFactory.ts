import { List } from "immutable";
import TransactionDataInterface from "models/TransactionData";

export default (allTransactions: List<TransactionDataInterface>) => (transaction: TransactionDataInterface): boolean => {
  return !allTransactions.some((listTransaction) => {
    if (!listTransaction) {
      return false;
    }

    return listTransaction.totalValue === transaction.totalValue &&
      listTransaction.startDate === transaction.startDate;
  });
}
