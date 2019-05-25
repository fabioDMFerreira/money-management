import Transaction from "../services/Transaction.class";
import transactionEditableFields from "../transactionEditableFields";
import TransactionDataInterface from "../TransactionDataInterface";

export default (field: transactionEditableFields, value: any) => (transaction: TransactionDataInterface) => {

  switch (field) {
    case 'visible':
      return {
        ...transaction,
        visible: value
      }
    case 'description':
      return {
        ...transaction,
        description: value,
      };
    case 'tags':
      return {
        ...transaction,
        tags: value
      }
    case 'selected':
      return {
        ...transaction,
        selected: value
      }
    default:
      break
  }

  const transactionDB: Transaction = Transaction.buildFromTransactionData(transaction);

  switch (field) {
    case 'credit':
      transactionDB.value = +value;
      break;
    case 'debit':
      transactionDB.value = -(+value);
      break;
    case 'startDate':
      transactionDB.startDate = value ? new Date(value) : new Date();
      break;
    case 'endDate':
      transactionDB.endDate = value ? new Date(value) : new Date();
      break;
    case 'particles':
      transactionDB.particles = +value;
      break;
    case 'interval':
      transactionDB.interval = +value;
      break;
    default:
      break;
  }

  return {
    ...transaction,
    ...transactionDB.convertToTransactionData()
  }
}
