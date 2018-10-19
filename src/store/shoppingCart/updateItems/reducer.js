import {
	INCREMENT_PRODUCT_NUMBER_OF_ITEMS,
	DECREMENT_PRODUCT_NUMBER_OF_ITEMS,
	UPDATE_PRODUCT_NUMBER_OF_ITEMS,
} from './types';

export default (state = {}, action = {}) => {
	switch (action.type) {
	case INCREMENT_PRODUCT_NUMBER_OF_ITEMS: {
		if (!action.productId) {
			return state;
		}

		if (state.items && state.items[action.productId]) {
			const items = {
				...state.items,
				[action.productId]: {
					...state.items[action.productId],
					numberOfItems: state.items[action.productId].numberOfItems + 1,
				},
			};

			return {
				...state,
				items,
				numberOfItems: state.numberOfItems + 1,
			};
		}

		return state;
	}

	case DECREMENT_PRODUCT_NUMBER_OF_ITEMS: {
		if (!action.productId) {
			return state;
		}

		const product = state.items && state.items[action.productId];
		if (state.items && product) {
			// keep product in list if there is a number of items
			let items;
			if (product.numberOfItems > 1) {
				items = {
					...state.items,
					[product.id]: {
						...state.items[action.productId],
						numberOfItems: product.numberOfItems - 1,
					},
				};
			} else {
				items = {
					...state.items,
				};
				delete items[product.id];
			}

			return {
				...state,
				items,
				numberOfItems: state.numberOfItems - 1,
			};
		}

		return state;
	}
	case UPDATE_PRODUCT_NUMBER_OF_ITEMS: {
		if (!action.productId) {
			return state;
		}

		if (state.items && state.items[action.productId]) {
			const subtractionOfOldNumberOfItemsbyActual =
                        action.numberOfItems - state.items[action.productId].numberOfItems,
				items = {
					...state.items,
					[action.productId]: {
						...state.items[action.productId],
						numberOfItems: action.numberOfItems,
					},
				};

			return {
				...state,
				items,
				numberOfItems: (state.numberOfItems || 0) + subtractionOfOldNumberOfItemsbyActual,
			};
		}

		return state;
	}
	default:
		return state;
	}
};

