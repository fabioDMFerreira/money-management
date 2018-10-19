import {
	INCREMENT_PRODUCT_NUMBER_OF_ITEMS,
	DECREMENT_PRODUCT_NUMBER_OF_ITEMS,
	UPDATE_PRODUCT_NUMBER_OF_ITEMS,
} from './types';

export function incrementProductNumberOfItems(productId) {
	return {
		type: INCREMENT_PRODUCT_NUMBER_OF_ITEMS,
		productId,
	};
}

export function decrementProductNumberOfItems(productId) {
	return {
		type: DECREMENT_PRODUCT_NUMBER_OF_ITEMS,
		productId,
	};
}

export function updateProductNumberOfItems(productId, numberOfItems) {
	return {
		type: UPDATE_PRODUCT_NUMBER_OF_ITEMS,
		productId,
		numberOfItems,
	};
}
