import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Rule from 'models/Rule';
import { Tag } from 'models/Tag';

import RuleEditor from './RuleEditor';

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

storiesOf('RuleEditor', module)
	.add('default', () => (
		<RuleEditor
			save={
				(rule: Rule) => {
					action('save')(rule);
				}
			}
			tags={tags}
			createTag={(tag: Tag) => {
				action('create tag')(tag);
			}}
		/>
	));
