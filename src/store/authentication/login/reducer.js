import { LOGIN_REQUEST_PENDING, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR } from './types';

export default (state = {}, action = {}) => {
	switch (action.type) {
	case LOGIN_REQUEST_SUCCESS:
		return {
			...state,
			loginRequestStatus: 'success',
			token: action.token,
			isLoggedIn: true,
		};
	case LOGIN_REQUEST_PENDING:
		return {
			...state,
			loginRequestStatus: 'pending',
			loginRequestErrorMessage: '',
		};
	case LOGIN_REQUEST_ERROR:
		return {
			...state,
			loginRequestStatus: 'error',
			loginRequestErrorMessage: action.errorMessage,
		};
	default:
		return state;
	}
};
