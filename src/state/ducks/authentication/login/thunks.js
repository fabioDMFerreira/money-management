
import { LOGIN } from './types';

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: 'test',
  });
};

export default {
  login,
};
