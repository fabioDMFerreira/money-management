export const getRulesSelector = (state: any) =>
  (state.rules && state.rules.rules) || [];
