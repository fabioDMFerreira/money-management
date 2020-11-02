import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
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
        },
      ]}
    />
  ));
