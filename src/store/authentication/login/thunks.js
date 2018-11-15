import Auth from 'services/auth';

import { LOGIN } from './types';

export const login = (email, password) =>
	(dispatch) => {
		const payload = Auth.login(email, password);

		dispatch({
			type: LOGIN,
			payload,
		});

		return payload;
	};


export default {
	login,
};
