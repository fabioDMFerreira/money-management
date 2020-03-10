export const getEstimatesSelector = (state: any) =>
  (state.estimates && state.estimates.transactions) || [];

export const getAllEstimatesSelector = (state: any) =>
  (state.estimates && state.estimates.allTransactions) || [];

export const getEstimatesSelectedSelector = (state: any) =>
  (state.estimates.selected || {});

export const getEstimatesFiltersSelector = (state: any) =>
  (state.estimates.filters || {});
