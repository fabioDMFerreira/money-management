import 'bootstrap/dist/css/bootstrap.css';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import TagsPie from './TagsPie';

storiesOf('TagsPie', module)
  .add('default', () => (
    <TagsPie
      data={[
        {
          name: 'lorem',
          value: 1,
        }, {
          name: 'ipsum',
          value: 2,
        }, {
          name: 'small',
          value: 0.0001,
        },
      ]}
      onClick={action('slicePicked')}
    />
  ));
