import { search, getSettingsCategory, getSettingsSize } from 'services/products';

import { getProductsRequestPending, getProductsRequestSuccess, getProductsRequestError, setSettingsProductsCategories, setSettingsSize, setFiltersSettings } from './actions';


export function searchProducts(filters) {
	return (dispatch) => {
		dispatch(getProductsRequestPending());

		function success(data) {
			const { colors, categories } = data;

			dispatch(setFiltersSettings({
				colors,
				categories,
			}));

			dispatch(getProductsRequestSuccess(data.hits.map(hit => hit.source)));
		}

		function error(err) {
			dispatch(getProductsRequestError(err.message));
		}

		return search(filters).then(success).catch(error);
	};
}

export function getCategories() {
	return (dispatch) => {
		function success(categories) {
			dispatch(setSettingsProductsCategories(categories));
		}

		return getSettingsCategory().then(success);
	};
}

export function getSizes() {
	return (dispatch) => {
		function success(categories) {
			dispatch(setSettingsSize(categories));
		}

		return getSettingsSize().then(success);
	};
}

