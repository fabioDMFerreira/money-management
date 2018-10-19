import {
	UPDATE_LIST_OF_PRODUCTS_FILTER, CLEAR_LIST_OF_PRODUCTS_FILTERS,
	GET_PRODUCTS_REQUEST_ERROR, GET_PRODUCTS_REQUEST_SUCCESS,
	GET_PRODUCTS_REQUEST_PENDING, SET_SETTINGS_PRODUCTS_CATEGORIES,
	SET_SETTINGS_SIZE, SET_FILTERS_SETTINGS,
} from './types';

export default (state = {}, action = {}) => {
	switch (action.type) {
	case GET_PRODUCTS_REQUEST_PENDING:
		return {
			...state,
			getProductsRequestStatus: 'pending',
			getProductsRequestErrorMessage: '',
		};
	case GET_PRODUCTS_REQUEST_ERROR:
		return {
			...state,
			getProductsRequestStatus: 'error',
			getProductsRequestErrorMessage: action.errorMessage,
		};
	case GET_PRODUCTS_REQUEST_SUCCESS:
		return {
			...state,
			getProductsRequestStatus: 'success',
			products: action.products,
		};
	case SET_SETTINGS_PRODUCTS_CATEGORIES:
		return {
			...state,
			settingsProductsCategories:
					action.categories.map(category => ({ label: category.label, value: category.value })),
		};
	case SET_SETTINGS_SIZE:
		return {
			...state,
			settingsSize: action.sizes.map(size => ({ label: size.label, value: size.value })),
		};
	case UPDATE_LIST_OF_PRODUCTS_FILTER:
		return {
			...state,
			productsFilters: {
				...state.productsFilters,
				[action.filter]: action.value,
			},
		};
	case CLEAR_LIST_OF_PRODUCTS_FILTERS:
		return {
			...state,
			productsFilters: {},
		};
	case SET_FILTERS_SETTINGS: {
		return {
			...state,
			filtersSettings: action.filtersSettings,
		};
	}
	default:
		return state;
	}
};

