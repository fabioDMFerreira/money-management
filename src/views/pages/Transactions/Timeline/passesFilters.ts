import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { filterType } from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';

export default (filters: filterType[] | undefined | null) => (transaction: TransactionConfig) => {
  if (!filters) {
    return true;
  }

  const generateFilter: (filter: string, value: string) => (transaction: TransactionConfig) => boolean = (filter: string, value: string) => {
    switch (filter) {
      case 'tags':
        return (transaction: TransactionConfig): boolean => {
          if (!transaction || !transaction.tags) {
            return false;
          }
          return transaction.tags && !!transaction.tags.find((tag: any) => tag.value.startsWith(value.toLowerCase()));
        };
      default:
        if (filter) {
          return (transaction: any) => typeof transaction[filter] === 'string' && transaction[filter].toLowerCase().startsWith(value);
        }
        return () => true;
    }
  };

  const filterFn: ((transaction: TransactionConfig) => boolean)[] =
    filters.map(filter => generateFilter(filter.id, filter.value));

  const filterValue = filterFn.every(filter => filter(transaction));
  return filterValue;
};
