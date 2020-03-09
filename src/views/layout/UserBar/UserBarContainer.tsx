import React from 'react';
import { useAuth0 } from 'views/providers/react-auth0-spa.provider';

import UserBar from './UserBar';

export default () => {
  const { isAuthenticated, user, logout } = useAuth0();

  if (!isAuthenticated) {
    return <span />;
  }

  return (
    <UserBar user={user} logout={logout} />
  );
};
