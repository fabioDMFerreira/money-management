import { connect } from 'react-redux';

import { incrementProductNumberOfItems, decrementProductNumberOfItems } from 'store/shoppingCart/actions';

import ShoppingCartEditProduct from './ShoppingCartEditProduct';

function mapDispatchToProps(dispatch) {
	return {
		incrementNumberOfItems: productId => dispatch(incrementProductNumberOfItems(productId)),
		decrementNumberOfItems: productId => dispatch(decrementProductNumberOfItems(productId)),
	};
}

export default connect(null, mapDispatchToProps)(ShoppingCartEditProduct);

