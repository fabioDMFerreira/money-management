
import { Rule } from 'models/Rule';

import { RulesActions } from './rulesActions';


interface RulesState {
  rules: Rule[];
}

const initialState: RulesState = {
  rules: [],
};

export default (state: RulesState = initialState, action: RulesActions): RulesState => {
  switch (action.type) {
    case 'ADD_RULE': {
      return {
        ...state,
        rules: [...state.rules, action.payload],
      };
    }
    case 'UPDATE_RULE': {
      const ruleIndex = state.rules.map(rule => rule.id).indexOf(action.ruleId);

      if (ruleIndex < 0) {
        return state;
      }

      const rules = [
        ...state.rules.slice(0, ruleIndex),
        { ...state.rules[ruleIndex], ...action.payload },
        ...state.rules.slice(ruleIndex + 1),
      ];

      return {
        ...state,
        rules,
      };
    }
    case 'REMOVE_RULE': {
      const rules = state.rules.filter(rule => rule.id !== action.ruleId);

      return {
        ...state,
        rules,
      };
    }
    default: {
      return state;
    }
  }
};
