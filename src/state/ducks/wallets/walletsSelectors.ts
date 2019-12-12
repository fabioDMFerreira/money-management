export const getWalletsSelector = (state: any) =>
  (state.wallets && state.wallets.wallets && state.wallets.wallets.toJS()) || [];
