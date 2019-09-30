import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-slider/assets/index.css';

import 'react-dates/initialize';

import GlobalFilters from './GlobalFilters';
import YYYYMMDD from 'utils/YYYYMMDD';
import { sumMonths } from 'models/utils';

storiesOf('GlobalFilters', module)
  .add('default', () => (
    <GlobalFilters
      globalFilters={{
        startDate: YYYYMMDD(new Date()),
        endDate: YYYYMMDD(sumMonths(new Date(), 12)),
        tags: [{
          label: 'Tag 1',
          id: 'tag1',
        }]
      }}
      tags={
        [{
          label: 'Tag 1',
          id: 'tag1',
        }, {
          label: 'Tag 2',
          id: 'tag2',
        }]}
      updateGlobalFilter={action('update global filter')}
      createTag={action('create tag')}
    />
  ));
