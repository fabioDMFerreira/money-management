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

  if (field === 'credit') {
    transactionDB.value = +value;
  } else if (field === 'debit') {
    transactionDB.value = -(+value);
  } else if (field === 'startDate') {
    transactionDB.startDate = value ? new Date(value) : new Date();
  } else if (field === 'endDate') {
    transactionDB.endDate = value ? new Date(value) : new Date();
  }

  return {
    ...transaction,
    ...transactionDB.convertToTransactionData(),
  };
};
