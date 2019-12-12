import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tag } from 'models/Tag';

import TagSelect from './TagSelect';

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

storiesOf('TagSelect', module)
	.add('default', () => (
		<TagSelect
			tags={tags}
			tagsSelected={[]}
			onChange={action('change')}
			createTag={(wallet: Tag) => { action('create tag')(wallet); }}
		/>
	));
