import { connect } from 'react-redux';
import ShoppingCartProductsList from './ShoppingCartProductsList';

function mapStateToProps(state) {
	const { items } = state.shoppingCart;

	return {
		items,
	};
}

export default connect(mapStateToProps)(ShoppingCartProductsList);
