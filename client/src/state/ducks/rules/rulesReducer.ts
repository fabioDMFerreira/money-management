
import { List } from 'immutable';
import { Rule } from 'models/Rule';

import { RulesActions } from './rulesActions';


interface RulesState {
  rules: List<Rule>;
}

const initialState: RulesState = {
  rules: List<Rule>([]),
};

export default (state: RulesState = initialState, action: RulesActions): RulesState => {
  switch (action.type) {
    case 'ADD_RULE': {
      return {
        ...state,
        rules: state.rules.push(action.payload),
      };
    }
    case 'UPDATE_RULE': {
      const ruleIndex = state.rules.findIndex((rule: any) => rule.id === action.ruleId);

      if (ruleIndex < 0) {
        return state;
      }

      return {
        ...state,
        rules:
          state.rules.update(
            ruleIndex,
            (rule: Rule) => ({
              ...rule,
              ...action.payload,
            }),
          ),
      };
    }
    case 'REMOVE_RULE': {
      const ruleIndex = state.rules.findIndex((rule: any) => rule.id === action.ruleId);

      if (ruleIndex < 0) {
        return state;
      }

      return {
        ...state,
        rules: state.rules.remove(ruleIndex),
      };
    }
    default: {
      return state;
    }
  }
};
