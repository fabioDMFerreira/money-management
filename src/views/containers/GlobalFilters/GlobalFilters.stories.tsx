import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { sumMonths } from 'utils/dateUtils/dateUtils';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

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
