import { Tag } from 'models/Tag';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';

type TransactionValueField = 'credit' | 'debit';

const pieDataFactory = (field: TransactionValueField) => (transactions: TransactionConfig[], tags: Tag[]) => {
  const data = [
    {
      name: 'Unassigned',
      value: transactions.reduce((value, transaction) => {
        if (
          transaction &&
          transaction.tags &&
          !transaction.tags.length &&
          transaction[field] &&
          transaction[field] !== '0'
        ) {
          value += transaction.totalValue ? Math.abs(+transaction.totalValue) : 0;
        }

        return value;
      }, 0),
      color: 'grey',
    },
    ...tags.map((tag: Tag) => ({
      name: tag.label,
      id: tag.id,
      color: tag.color,
      value: transactions.reduce((value, transaction) => {
        if (
          transaction.tags &&
          transaction.tags.includes(tag.id) &&
          transaction[field] &&
          transaction[field] !== '0'
        ) {
          value += transaction.totalValue ? Math.abs(+transaction.totalValue) : 0;
        }

        return value;
      }, 0),
    })),
  ].filter(data => data.value);

  data.forEach((option) => {
    option.value = +option.value.toFixed(2);
  });

  return data;
};

export const generatePieCreditData = pieDataFactory('credit');
export const generatePieDebitData = pieDataFactory('debit');

