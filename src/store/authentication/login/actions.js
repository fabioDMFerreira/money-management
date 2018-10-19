import { LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_PENDING, LOGIN_REQUEST_ERROR } from './types';

/**
 * @param {Token} token
 */
export function loginRequestSuccess(token) {
	return {
		type: LOGIN_REQUEST_SUCCESS,
		token,
	};
}

export function loginRequestPending() {
	return {
		type: LOGIN_REQUEST_PENDING,
	};
}

export function loginRequestError(errorMessage) {
	return {
		type: LOGIN_REQUEST_ERROR,
		errorMessage,
	};
}
