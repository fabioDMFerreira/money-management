// src/react-auth0-spa.js
import createAuth0Client from '@auth0/auth0-spa-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ProviderProps {
  children: React.ReactNode;
  onRedirectCallback?: any;
}

export interface Auth0User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

interface Auth0Context {
  isAuthenticated: boolean;
  user: Auth0User;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: () => Promise<void>;
  handleRedirectCallback: () => Promise<void>;
  getIdTokenClaims: () => Promise<void>;
  loginWithRedirect: () => Promise<void>;
  getTokenSilently: () => Promise<void>;
  getTokenWithPopup: () => Promise<void>;
  logout: () => Promise<void>;
}

export const Auth0Context = createContext({
  isAuthenticated: false,
  user: {
    nickname: 'loremipsum',
    name: 'loremipsum',
    picture: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    updated_at: 'loremipsum',
    email: 'loremipsum',
    email_verified: true,
    sub: 'offline',
  },
  loading: false,
  popupOpen: false,
  loginWithPopup: () => Promise.resolve(),
  handleRedirectCallback: () => Promise.resolve(),
  getIdTokenClaims: () => Promise.resolve(),
  loginWithRedirect: () => Promise.resolve(),
  getTokenSilently: () => Promise.resolve(),
  getTokenWithPopup: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderProps & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Auth0User>({
    nickname: 'loremipsum',
    name: 'loremipsum',
    picture: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    updated_at: 'loremipsum',
    email: 'loremipsum',
    email_verified: true,
    sub: 'offline',
  });
  const [auth0Client, setAuth0] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);

      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=') &&
        window.location.search.includes('state=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any) => auth0Client.getTokenWithPopup(...p),
        logout: (...p: any) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
