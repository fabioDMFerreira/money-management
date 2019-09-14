import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BulkUpdateModal from './BulkUpdateModal';

import 'bootstrap/dist/css/bootstrap.css';

storiesOf('BulkUpdateModal', module)
  .add('default', () => (
    <BulkUpdateModal
      opened
      close={action('closed')}
      save={action('save')}
      tags={[
        { label: 'tag 1', value: 'tag2' }
      ]}
      createTag={action('create tag')}
    />
  ));
