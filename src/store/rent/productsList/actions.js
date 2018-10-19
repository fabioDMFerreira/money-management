import {
	UPDATE_LIST_OF_PRODUCTS_FILTER, CLEAR_LIST_OF_PRODUCTS_FILTERS,
	GET_PRODUCTS_REQUEST_ERROR, GET_PRODUCTS_REQUEST_SUCCESS, GET_PRODUCTS_REQUEST_PENDING,
	SET_SETTINGS_PRODUCTS_CATEGORIES,
	SET_SETTINGS_SIZE,
	SET_FILTERS_SETTINGS,
} from './types';


export function updateListOfProductsFilter(filter, value) {
	return {
		type: UPDATE_LIST_OF_PRODUCTS_FILTER,
		filter,
		value,
	};
}

export function clearListOfProductsFilters() {
	return {
		type: CLEAR_LIST_OF_PRODUCTS_FILTERS,
	};
}

export function getProductsRequestSuccess(products) {
	return {
		type: GET_PRODUCTS_REQUEST_SUCCESS,
		products,
	};
}

export function getProductsRequestPending() {
	return {
		type: GET_PRODUCTS_REQUEST_PENDING,
	};
}

export function getProductsRequestError(errorMessage) {
	return {
		type: GET_PRODUCTS_REQUEST_ERROR,
		errorMessage,
	};
}

export function setSettingsProductsCategories(categories) {
	return {
		type: SET_SETTINGS_PRODUCTS_CATEGORIES,
		categories,
	};
}

export function setSettingsSize(sizes) {
	return {
		type: SET_SETTINGS_SIZE,
		sizes,
	};
}

export function setFiltersSettings(filtersSettings) {
	return {
		type: SET_FILTERS_SETTINGS,
		filtersSettings,
	};
}
