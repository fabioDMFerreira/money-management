import { LOGOUT } from './types';

export default (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        token: null,
        tokenDecoded: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
