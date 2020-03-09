import { connect } from 'react-redux';

import Navbar from './Navbar';

function mapStateToProps(state) {
  const { authentication: { isLoggedIn } } = state;
  return {
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(Navbar);
