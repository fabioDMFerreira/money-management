import 'bootstrap/dist/css/bootstrap.css';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-slider/assets/index.css';
import 'react-dates/initialize';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { sumMonths } from 'models/utils';
import React from 'react';
import YYYYMMDD from 'utils/YYYYMMDD';

import GlobalFilters from './GlobalFilters';

storiesOf('GlobalFilters', module)
  .add('default', () => (
    <span />
    /* <GlobalFilters
      globalFilters={{
        startDate: YYYYMMDD(new Date()),
        endDate: YYYYMMDD(sumMonths(new Date(), 12)),
        tags: [{
          label: 'Tag 1',
          id: 'tag1',
        }]
      }}
      updateGlobalFilter={action('update global filter')}
    /> */
  ));