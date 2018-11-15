import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED, SET_TOKEN } from './types';

export default (state = {}, action = {}) => {
	switch (action.type) {
	case LOGIN_FULFILLED:
		if (!action.payload || !action.payload.token) {
			console.trace('Token undefined');
			return state;
		}
		return {
			...state,
			loginRequestStatus: 'success',
			token: action.payload.token,
			tokenDecoded: action.payload.tokenDecoded,
			isLoggedIn: true,
		};
	case LOGIN_PENDING:
		return {
			...state,
			loginRequestStatus: 'pending',
			loginRequestErrorMessage: '',
		};
	case LOGIN_REJECTED:
		return {
			...state,
			loginRequestStatus: 'error',
			loginRequestErrorMessage: action.errorMessage,
		};
	case SET_TOKEN:
		return {
			...state,
			token: action.token,
			tokenDecoded: action.tokenDecoded,
			isLoggedIn: true,
		};
	default:
		return state;
	}
};
