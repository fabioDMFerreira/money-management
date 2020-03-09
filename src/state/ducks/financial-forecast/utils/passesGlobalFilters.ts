import { GlobalFilters } from 'models/GlobalFilters';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';

export default (globalFilters: GlobalFilters = {}) => (transaction: TransactionConfig) => {
  let matchesStartDate = true;
  let matchesEndDate = true;
  let matchesTags = true;
  let matchesCredit = true;
  let matchesDebit = true;
  let matchesDescription = true;
  let matchesWallet = true;
  let matchesInternalTransaction = true;

  if (!globalFilters) {
    return true;
  }

  if (globalFilters.startDate && transaction.startDate) {
    matchesStartDate = new Date(transaction.startDate) >= new Date(globalFilters.startDate);
  } else if (globalFilters.startDate && !transaction.startDate) {
    matchesStartDate = false;
  }

  if (globalFilters.endDate && transaction.endDate) {
    matchesEndDate = new Date(transaction.endDate) <= new Date(globalFilters.endDate);
  } else if (globalFilters.endDate && !transaction.endDate) {
    matchesEndDate = false;
  }

  if (globalFilters.tags && globalFilters.tags.length && transaction.tags) {
    const globalTagsIds = globalFilters.tags;
    matchesTags = transaction.tags.some(tag => globalTagsIds.includes(tag));

    if (globalTagsIds.includes('unassigned') && (!transaction.tags || !transaction.tags.length)) {
      matchesTags = true;
    }
  }

  if (globalFilters.wallet) {
    if (globalFilters.wallet === 'unassigned') {
      matchesWallet = !transaction.wallet;
    } else {
      matchesWallet = transaction.wallet === globalFilters.wallet;
    }
  }

  if (globalFilters.credit && transaction.credit && +transaction.credit > 0) {
    matchesCredit = +transaction.credit >= globalFilters.credit[0] && +transaction.credit <= globalFilters.credit[1];
  } else if (globalFilters.credit && !transaction.credit) {
    matchesCredit = false;
  }

  if (globalFilters.debit && transaction.debit && +transaction.debit > 0) {
    matchesDebit = +transaction.debit >= globalFilters.debit[0] && +transaction.debit <= globalFilters.debit[1];
  } else if (globalFilters.debit && !transaction.debit) {
    matchesDebit = false;
  }

  if (globalFilters.description && transaction.description) {
    matchesDescription = transaction.description.toLowerCase().includes(globalFilters.description.toLowerCase());
  } else if (globalFilters.description && !transaction.description) {
    matchesDescription = false;
  }

  if (globalFilters.hideInternalTransactions) {
    matchesInternalTransaction = !transaction.isInternalTransaction;
  }

  return matchesStartDate &&
    matchesEndDate &&
    matchesTags &&
    matchesCredit &&
    matchesDebit &&
    matchesDescription &&
    matchesWallet &&
    matchesInternalTransaction;
};
