import { ADD_SHOPPING_CART_PRODUCT } from './types';

export function addShoppingCartProduct(product) {
	return {
		type: ADD_SHOPPING_CART_PRODUCT,
		product,
	};
}

export default addShoppingCartProduct;

