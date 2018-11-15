import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { func, string, bool } from 'prop-types';

import InputAndValidationMessages from 'components/Input/InputAndValidationMessages';
import Translate from 'components/Translate';
import { EMAIL, PASSWORD } from 'locale/consts';


import validate from './validateLoginForm';

const LoginForm = ({ handleSubmit, loginRequestErrorMessage, submitting }) => (
	<Form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="email">
				<Translate id={EMAIL}>Email</Translate>
				<Field name="email" component={InputAndValidationMessages} type="email" />
			</label>
		</div>
		<div>
			<label htmlFor="password">
				<Translate id={PASSWORD}>Password</Translate>
				<Field name="password" component={InputAndValidationMessages} type="password" />
			</label>
		</div>
		<div>
			<Translate id={loginRequestErrorMessage} />
		</div>
		<div>
			<button type="submit" className="btn btn-outline-primary" disabled={submitting}><Translate id="LOGIN" /></button>
		</div>
	</Form>
);

LoginForm.propTypes = {
	handleSubmit: func.isRequired,
	loginRequestErrorMessage: string,
	submitting: bool.isRequired,
};

LoginForm.defaultProps = {
	loginRequestErrorMessage: '',
};

export default reduxForm({
	form: 'LoginForm',
	validate,
})(LoginForm);

