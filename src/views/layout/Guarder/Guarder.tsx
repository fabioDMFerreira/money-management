import React, { Fragment } from 'react';
import { useAuth0 } from 'views/providers/react-auth0-spa.provider';

interface GuarderProps {
  children: React.ReactNode;
}

const Guarder = ({ children }: GuarderProps) => {
  const {
    isAuthenticated, loginWithRedirect, loading,
  } = useAuth0();

  // if (loading) {
  //   return <span />;
  // } else if (!isAuthenticated) {
  //   loginWithRedirect();

  //   return <span />;
  // }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Guarder;
