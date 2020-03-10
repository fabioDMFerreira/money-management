import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { transactionEditableFields } from 'models/Transaction/TransactionEditableFields';

export default (field: transactionEditableFields, value: any) => (transaction: TransactionConfig) => {
  const normalFields = [
    'visible',
    'description',
    'tags',
    'selected',
    'wallet',
  ];

  if (normalFields.indexOf(field) >= 0) {
    return {
      ...transaction,
      [field]: value,
    };
  };

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
      // transactionDB[field] = value;
      break;
  }

  return {
    ...transaction,
    ...transactionDB.convertToTransactionData(),
  };
};
