import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import { Tag } from 'models/Tag';
import React from 'react';

import TagSelect from './TagSelect';

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
