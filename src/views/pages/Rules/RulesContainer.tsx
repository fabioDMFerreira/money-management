import React from 'react';
import Rules from './Rules';
import { useSelector, useDispatch } from 'react-redux';
import { getRulesSelector, createRule, removeRule } from 'state/ducks/rules';
import { getTagsSelector, createTag } from 'state/ducks/tags';
import Rule from 'models/Rule';
import { Tag } from 'models/Tag';
import Onboarding from 'views/components/Onboarding';

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
