import Auth from 'services/auth';

import { loginRequestSuccess, loginRequestPending, loginRequestError } from './actions';

export const login = (email, password) =>
	(dispatch) => {
		dispatch(loginRequestPending());

		function success(data) {
			dispatch(loginRequestSuccess(data));
		}

		function error(errorMessage) {
			dispatch(loginRequestError(errorMessage));
		}

		return Auth.login(email, password)
			.then(success)
			.catch(err => error(err.message));
	};


export default {
	login,
};
