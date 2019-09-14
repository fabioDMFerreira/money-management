import validate from 'validate.js';

export default (values) => {
	const constraints = {
		email: {
			presence: {
				message: '^REQUIRED',
			},
			email: {
				message: '^INVALID_EMAIL',
			},
		},
		password: {
			presence: {
				message: '^REQUIRED',
			},
			length: {
				minimum: 6,
				message: '^INVALID_PASSWORD',
			},
		},
	};

	return validate(values, constraints);
};

