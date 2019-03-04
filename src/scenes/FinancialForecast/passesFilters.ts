import TransactionDataInterface from "./TransactionDataInterface";
import { filterType } from "./FinancialForecastActions";

export default (filters: filterType[] | undefined | null) => (transaction: TransactionDataInterface) => {
  if (!filters) {
    return true;
  }

  const generateFilter: (filter: string, value: string) => (transaction: TransactionDataInterface) => boolean = (filter: string, value: string) => {
    switch (filter) {
      case 'tags':
        return (transaction: TransactionDataInterface): boolean => {
          if (!transaction || !transaction.tags) {
            return false;
          }
          return transaction.tags && !!transaction.tags.find((tag: any) => tag.value.startsWith(value.toLowerCase()));
        }
        break;
      default:
        if (filter) {
          return (transaction: any) => {
            return typeof transaction[filter] === 'string' && transaction[filter].toLowerCase().startsWith(value)
          }
        } else {
          return () => true
        }
    }
  }

  let filterFn: ((transaction: TransactionDataInterface) => boolean)[] =
    filters.map(filter => generateFilter(filter.id, filter.value));

  const filterValue = filterFn.every(filter => filter(transaction));
  return filterValue;
}
