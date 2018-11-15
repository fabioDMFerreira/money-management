// import Axios from 'axios';
// import jwtDecode from 'jwt-decode';

// import { API_URL } from './config';

/**
 * Authentication Token
 * @typedef {Object} Token
 * @param {string} access_token
 * @param {number} expires_in
 * @param {string} id_token
 * @param {string} refresh_token
 * @param {string} resource
 * @param {string} token_type
 */


/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise.<Token,Error>}
 */
export default (email, password) => {
	// if (API_URL) {
	// 	return Axios
	// 		.post(`${API_URL}/api/users/login`, { email, password }, { credentials: 'include' })
	// 		.then(response => response.data)
	// 		.then((data) => {
	// 			const tokenDecoded = jwtDecode(data.token);
	// 			return {
	// 				...data,
	// 				tokenDecoded,
	// 			};
	// 		});
	// }

	return new Promise((accept, reject) => {
		setTimeout(() => {
			accept({
				token: {
					access_token: '123456',
				},
			});
		}, 800);
	});
};

