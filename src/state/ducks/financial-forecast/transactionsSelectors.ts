export const getTransactionsSelector = (state: any) => state.financialForecast && state.financialForecast.transactions && state.financialForecast.transactions.toJS() || [];

export const getTransactionByIdSelector = (state: any, id: string) => state.financialForecast && state.financialForecast.transactions && state.financialForecast.transactions.find((transaction: any) => transaction.id === id);
