import 'react-dates/initialize';
import './shared.css';

import AppWithStore from 'AppWithStore';
import React from 'react';
import { render } from 'react-dom';
import BackendClient from 'services/BackendClient';
import Guarder from 'views/layout/Guarder';
import { BackendProvider } from 'views/providers/backend.provider';
import { Auth0Provider } from 'views/providers/react-auth0-spa.provider';
import history from 'views/utils/history';

import registerServiceWorker from './registerServiceWorker';

// A function that routes the user to the right place
// after login
const onRedirectCallback = () => {
  history.push(window.location.pathname);
};

const client = new BackendClient();

(async () => {
  await client.loadConfig();

  if (client.config) {
    render(
      <Auth0Provider
        domain={client.config.auth0domain}
        client_id={client.config.auth0clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <BackendProvider client={client}>
          <Guarder>
            <AppWithStore />
          </Guarder>
        </BackendProvider>
      </Auth0Provider>
      , document.getElementById('root'),
    );
  } else {
    render(
      <Auth0Provider domain="" client_id="">
        <BackendProvider client={client}>
          <AppWithStore />
        </BackendProvider>
      </Auth0Provider >
      , document.getElementById('root'),
    );
  }

  registerServiceWorker();
})();
