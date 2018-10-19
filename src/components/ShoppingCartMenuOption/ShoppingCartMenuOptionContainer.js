import { connect } from 'react-redux';

import ShoppingCartMenuOption from './ShoppingCartMenuOption';

function mapStateToProps(state) {
	if (state.shoppingCart) {
		return {
			numberOfItems: state.shoppingCart.numberOfItems,
		};
	}

	return {};
}

export default connect(mapStateToProps)(ShoppingCartMenuOption);
