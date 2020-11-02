import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import { Rule } from 'models/Rule';
import { Tag } from 'models/Tag';
import React from 'react';

import RuleEditor from './RuleEditor';

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
