import { connect } from 'react-redux';

import { addShoppingCartProduct } from 'store/shoppingCart/actions';

import ShoppingCartAddProduct from './ShoppingCartAddProduct';

function mapDispatchToProps(dispatch) {
	return {
		addProductToShoppingCart: product => dispatch(addShoppingCartProduct(product)),
	};
}

export default connect(null, mapDispatchToProps)(ShoppingCartAddProduct);
