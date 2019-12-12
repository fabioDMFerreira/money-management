export const getRulesSelector = (state: any) => state.rules && state.rules.rules && state.rules.rules.toJS() || [];
