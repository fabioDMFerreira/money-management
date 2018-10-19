import reduceReducers from 'reduce-reducers';

import LoginFormReducer from './login';
import LogoutReducer from './logout';

export default reduceReducers(LoginFormReducer, LogoutReducer);
