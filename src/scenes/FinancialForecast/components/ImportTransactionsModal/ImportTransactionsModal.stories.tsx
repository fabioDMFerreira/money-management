import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ImportTransactionsModal from './ImportTransactionsModal';

storiesOf('ImportTransactionsModal', module)
  .add('with some emoji', () => (
    <ImportTransactionsModal
      opened
      close={action('closed')}
      save={action('save')}
      data={[]}
    />
  ));
