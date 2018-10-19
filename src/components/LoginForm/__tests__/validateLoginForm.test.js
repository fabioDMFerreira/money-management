import validateLoginForm from '../validateLoginForm';

describe('validateLoginForm', () => {
	it('should return errors if email and password are empty', () => {
		let actual = validateLoginForm({}),
			expected = {
				email: ['REQUIRED'],
				password: ['REQUIRED'],
			};

		expect(actual).toEqual(expected);

		actual = validateLoginForm();
		expected = {
			email: ['REQUIRED'],
			password: ['REQUIRED'],
		};

		expect(actual).toEqual(expected);
	});

	it('should return errors if email is invalid and password are empty', () => {
		const actual = validateLoginForm({ email: 'test' }),
			expected = {
				email: ['INVALID_EMAIL'],
				password: ['REQUIRED'],
			};

		expect(actual).toEqual(expected);
	});

	it('should return errors if email is empty and password is invalid ', () => {
		const actual = validateLoginForm({ password: '1234' }),
			expected = {
				email: ['REQUIRED'],
				password: ['INVALID_PASSWORD'],
			};

		expect(actual).toEqual(expected);
	});

	it('should return nothing if email and password are valid', () => {
		const actual = validateLoginForm({ email: 'test@mail.com', password: '1234567' }),
			expected = undefined;
		expect(actual).toEqual(expected);
	});
});
