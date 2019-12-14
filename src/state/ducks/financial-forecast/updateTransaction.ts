import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { transactionEditableFields } from 'models/Transaction/TransactionEditableFields';

export default (field: transactionEditableFields, value: any) => (transaction: TransactionConfig) => {
  switch (field) {
    case 'visible':
      return {
        ...transaction,
        visible: value,
      };
    case 'description':
      return {
        ...transaction,
        description: value,
      };
    case 'tags':
      return {
        ...transaction,
        tags: value,
      };
    case 'selected':
      return {
        ...transaction,
        selected: value,
      };
    case 'wallet': {
      return {
        ...transaction,
        wallet: value,
      };
    }
    default:
      break;
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
      transactionDB[field] = value;
      break;
  }

  return {
    ...transaction,
    ...transactionDB.convertToTransactionData(),
  };
};
