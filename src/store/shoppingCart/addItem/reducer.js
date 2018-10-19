import { ADD_SHOPPING_CART_PRODUCT } from './types';

export default (state = {}, action = {}) => {
	switch (action.type) {
	case ADD_SHOPPING_CART_PRODUCT: {
		if (!action.product || !action.product.id) {
			return state;
		}

		if (state.items && state.items[action.product.id]) {
			const items = {
				...state.items,
				[action.product.id]: {
					...state.items[action.product.id],
					numberOfItems: state.items[action.product.id].numberOfItems + 1,
				},
			};
			return {
				...state,
				numberOfItems: state.numberOfItems + 1,
				items,
			};
		}

		const items = {
			...state.items,
			[action.product.id]: {
				...action.product,
				numberOfItems: 1,
			},
		};
		return {
			...state,
			numberOfItems: (state.numberOfItems || 0) + 1,
			items,
		};
	}
	default:
		return state;
	}
};
