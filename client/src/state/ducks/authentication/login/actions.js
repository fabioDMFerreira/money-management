import jwtDecode from 'jwt-decode';

import { SET_TOKEN } from './types';


/**
 * @param {Token} token
 */
// eslint-disable-next-line import/prefer-default-export
export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
    tokenDecoded: jwtDecode(token),
  };
}
