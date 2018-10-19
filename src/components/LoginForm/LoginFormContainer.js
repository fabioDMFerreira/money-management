import { connect } from 'react-redux';

import { login as loginAction } from 'store/authentication/thunks';
import LoginForm from './LoginForm';

function mapStateToProps(state) {
	const { authentication: { loginRequestErrorMessage } } = state;

	return {
		loginRequestErrorMessage,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSubmit: values => dispatch(loginAction(values.email, values.password)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
