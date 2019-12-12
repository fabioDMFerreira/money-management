import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Rule from 'models/Rule';
import { Tag } from 'models/Tag';

import Rules from './Rules';

import 'bootstrap/dist/css/bootstrap.css';

const tags: Tag[] = [
	{
		label: 'tag 1',
		id: '1',
	}, {
		label: 'tag 2',
		id: '2',
	},
];

const rules: Rule[] = [
	{
		id: '1',
		pattern: {
			field: 'description',
			value: 'Car Mortage',
		},
		rule: {
			field: 'tags',
			value: 'Car',
		},
	},
];

storiesOf('Rules Page', module)
	.add('default', () => (
		<Rules
			tags={tags}
			createTag={(tag: Tag) => {
				action('create tag')(tag);
			}}
			rules={rules}
			addRule={(rule: Rule) => {
				action('add rule')(rule);
			}}
			removeRule={(ruleId:string) => {
				action('remove rule')(ruleId);
			}}
		/>
	));
