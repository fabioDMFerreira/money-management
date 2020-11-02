import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';

import ButtonWithConfirmation from './ButtonWithConfirmation';


storiesOf('ButtonWithConfirmation', module)
  .add('default', () => (
    <ButtonWithConfirmation
      outline
      color="primary"
      size="sm"
      onClick={action('confirm')}
    >
      Clear all
    </ButtonWithConfirmation>
  ));
