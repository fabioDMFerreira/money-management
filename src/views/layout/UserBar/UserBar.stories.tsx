import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

import UserBar from './UserBar';

storiesOf('User Bar', module)
  .add('default', () => (
    <UserBar
      user={{
        nickname: 'loremipsum',
        name: 'loremipsum',
        picture: 'https://api.adorable.io/avatars/285/abott@adorable.png',
        updated_at: 'loremipsum',
        email: 'loremipsum',
        email_verified: true,
        sub: 'loremipsum',
      }}
      logout={action('logout')}
    />
  ));
