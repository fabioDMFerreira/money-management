import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'bootstrap/dist/css/bootstrap.css';

import GlobalFilters from './GlobalFilters';
import YYYYMMDD from 'utils/YYYYMMDD';
import { sumMonths } from 'scenes/FinancialForecast/services/utils';

storiesOf('GlobalFilters', module)
  .add('default', () => (
    <GlobalFilters
      globalFilters={{
        startDate: YYYYMMDD(new Date()),
        endDate: YYYYMMDD(sumMonths(new Date(), 12)),
        tags: [{
          label: 'Tag 1',
          value: 'tag1',
        }]
      }}
      tags={
        [{
          label: 'Tag 1',
          value: 'tag1',
        }, {
          label: 'Tag 2',
          value: 'tag2',
        }]}
      updateGlobalFilter={action('update global filter')}
      createTag={action('create tag')}
    />
  ));
