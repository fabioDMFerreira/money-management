import reducer from '../reducer';
import {
	updateListOfProductsFilter, clearListOfProductsFilters,
	getProductsRequestPending, getProductsRequestSuccess, getProductsRequestError, setFiltersSettings,
} from '../actions';

describe('List of Products reducer', () => {
	it('should update a filter', () => {
		const actual = reducer({}, updateListOfProductsFilter('productSize', 'XS')),
			expected = { productsFilters: { productSize: 'XS' } };

		expect(actual).toEqual(expected);
	});

	it('should clear filters', () => {
		const actual = reducer({ productsFilters: { productSize: 'XS' } }, clearListOfProductsFilters()),
			expected = { productsFilters: {} };

		expect(actual).toEqual(expected);
	});

	it('should set products request state as pending', () => {
		const actual = reducer({}, getProductsRequestPending()),
			expected = {
				getProductsRequestStatus: 'pending',
				getProductsRequestErrorMessage: '',
			};

		expect(actual).toEqual(expected);
	});

	it('should set products request state as success and ', () => {
		const products = [1, 2, 3, 4],
			actual = reducer({}, getProductsRequestSuccess(products)),
			expected = {
				getProductsRequestStatus: 'success',
				products,
			};

		expect(actual).toEqual(expected);
	});

	it('should set products request state as error', () => {
		const actual = reducer({}, getProductsRequestError()),
			expected = {
				getProductsRequestStatus: 'error',
			};

		expect(actual).toEqual(expected);
	});

	it('should set settings filters', () => {
		const actual = reducer({}, setFiltersSettings({ colors: ['red', 'blue'], categories: [1, 2, 3] })),
			expected = {
				filtersSettings: {
					colors: ['red', 'blue'], categories: [1, 2, 3],
				},
			};

		expect(actual).toEqual(expected);
	});
});
