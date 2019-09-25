import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';

import TagsTable from './TagsTable';

storiesOf('TagsTable', module)
  .add('default', () => (
    <TagsTable
      data={[
        {
          name: 'lorem',
          value: 1,
        }, {
          name: 'ipsum',
          value: 2,
        }
      ]}
    />
  ));
