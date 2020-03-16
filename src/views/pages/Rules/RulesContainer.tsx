import { Rule } from 'models/Rule';
import { Tag } from 'models/Tag';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRule, getRulesSelector, removeRule } from 'state/ducks/rules';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import Onboarding from 'views/containers/Onboarding';

import Rules from './Rules';

export default () => {
  const dispatch = useDispatch();
  const rules = useSelector(getRulesSelector);
  const tags = useSelector(getTagsSelector);

  const dispatchAddRule = (rule: Rule) => dispatch(createRule(rule));
  const dispatchRemoveRule = (ruleId: string) => dispatch(removeRule(ruleId));
  const dispatchCreateTag = (tag: Tag) => dispatch(createTag(tag));

  if (!tags.length) {
    return (
      <Onboarding
        tags={[]}
      />
    );
  }

  return (
    <Rules
      addRule={dispatchAddRule}
      removeRule={dispatchRemoveRule}
      rules={rules}
      tags={tags}
      createTag={dispatchCreateTag}
    />);
};
