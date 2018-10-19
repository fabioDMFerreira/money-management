import reducer from '../reducer';
import { loginRequestSuccess, loginRequestPending, loginRequestError } from '../actions';

describe('LoginForm reducer', () => {
	it('loginRequestSuccess should set login request status with value success and a token', () => {
		const token = { access_token: 12345 },
			actual = reducer({}, loginRequestSuccess(token)),
			expected = { loginRequestStatus: 'success', token, isLoggedIn: true };

		expect(actual).toEqual(expected);
	});

	it('loginRequestError should set login request status with value error and the error message', () => {
		const errorMessage = 'Unable to login',
			actual = reducer({}, loginRequestError(errorMessage)),
			expected = { loginRequestStatus: 'error', loginRequestErrorMessage: errorMessage };

		expect(actual).toEqual(expected);
	});

	it('loginSuccess should set login request status as success with value pending', () => {
		const actual = reducer({}, loginRequestPending()),
			expected = { loginRequestErrorMessage: '', loginRequestStatus: 'pending' };

		expect(actual).toEqual(expected);
	});
});
