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
export default (email, password) => new Promise((accept, reject) => {
	setTimeout(() => {
		if (email === 'test@test.com' && password === '123456') {
			return accept({
				token: {
					access_token: '12345',
				},
			});
		} else if (email === 'test@test.com') {
			return reject(new Error('INCORRECT_PASSWORD'));
		}
		return reject(new Error('USER_DOES_NOT_EXIST'));
	}, 800);
});
