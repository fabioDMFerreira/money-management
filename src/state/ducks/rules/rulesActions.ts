import { Rule } from 'models/Rule';
import getRandomString from 'utils/getRandomString';

import { CREATE_RULE, REMOVE_RULE, UPDATE_RULE } from './rulesTypes';


interface CreateRuleAction {
  type: typeof CREATE_RULE;
  payload: Rule;
}

export const createRule = (payload: Rule): CreateRuleAction => ({
  type: CREATE_RULE,
  payload: {
    id: payload.id || getRandomString(),
    ...payload,
  },
});

interface RemoveRuleAction {
  type: typeof REMOVE_RULE;
  ruleId: string;
}

export const removeRule = (ruleId: string): RemoveRuleAction => ({
  type: REMOVE_RULE,
  ruleId,
});

interface UpdateRuleDto {
  pattern?: {
    field: string;
    value: string;
  };
  rule?: {
    field: string;
    value: string;
  };
}

interface UpdateRuleAction {
  type: typeof UPDATE_RULE;
  ruleId: string;
  payload: UpdateRuleDto;
}

export const updateRule = (ruleId: string, payload: UpdateRuleDto): UpdateRuleAction => ({
  type: UPDATE_RULE,
  ruleId,
  payload,
});

export type RulesActions = CreateRuleAction | RemoveRuleAction | UpdateRuleAction;
