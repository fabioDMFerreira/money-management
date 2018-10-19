import { connect } from 'react-redux';

import Logout from './Logout';
import { logout } from 'store/authentication/actions';

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch(logout()),
	};
}

export default connect(null, mapDispatchToProps)(Logout);

