export const getGlobalFiltersSelector = (state: any) => (
  state.financialForecast.globalFilters || {}
);
