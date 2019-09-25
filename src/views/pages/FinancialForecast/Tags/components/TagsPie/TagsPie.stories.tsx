import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'bootstrap/dist/css/bootstrap.css';
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
          value: 0.0001
        }
      ]}
      onClick={action('slicePicked')}
    />
  ));
