import * as crypto from 'crypto';
import React, { createContext, useContext } from 'react';
import BackendClient from 'services/BackendClient';

import { useAuth0 } from './react-auth0-spa.provider';

const hash = (str: string) => crypto
  .createHmac('sha256', 'app-secret')
  .update(str)
  .digest('hex');

interface BackendProviderProps {
  children: React.ReactNode;
  client: BackendClient;
}

export const BackendContext = createContext({
  pouchdb: null,
});
export const useBackend = () => useContext(BackendContext);
export const BackendProvider = ({
  children,
  client,
}: BackendProviderProps) => {
  // const { isAuthenticated, user } = useAuth0();

  // if (isAuthenticated && client.config && user) {
  //   client.loadPouchDB(`${client.config.couchdbUrl}/state-${hash(user.sub)}`);
  // } else {
  client.loadPouchDB();
  // }

  return (
    <BackendContext.Provider
      value={{
        pouchdb: client.pouchDB,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
