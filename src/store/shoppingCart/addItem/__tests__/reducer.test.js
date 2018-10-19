import reducer from '../reducer';

import { addShoppingCartProduct } from '../actions';

describe('Shopping Cart Add Product reducer', () => {
	it('should not add product to shopping cart if it does not have id', () => {
		let expected = {
				numberOfItems: 1,
				items: {
					1: {
						id: 1,
						retailPrice: 100,
						numberOfItems: 1,
					},
				},
			},
			actual = reducer(expected, addShoppingCartProduct({}));
		expect(actual).toEqual(expected);

		expected = {
			numberOfItems: 1,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 1,
				},
			},
		};

		actual = reducer(expected, addShoppingCartProduct());
		expect(actual).toEqual(expected);
	});

	it('should add product to shopping cart if it does not exist', () => {
		let product = {
				id: 1,
				retailPrice: 100,
			},
			actual = reducer({}, addShoppingCartProduct(product)),
			expected = {
				numberOfItems: 1,
				items: {
					1: {
						id: 1,
						retailPrice: 100,
						numberOfItems: 1,
					},
				},
			};

		expect(actual).toEqual(expected);

		product = {
			id: 2,
			retailPrice: 100,
		};
		actual = reducer({
			numberOfItems: 1,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 1,
				},
			},
		}, addShoppingCartProduct(product));
		expected = {
			numberOfItems: 2,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 1,
				},
				2: {
					id: 2,
					retailPrice: 100,
					numberOfItems: 1,
				},
			},
		};

		expect(actual).toEqual(expected);
	});

	it('should increment product number of items in shopping cart on adding product if it exists', () => {
		const product = {
				id: 1,
				retailPrice: 100,
			},
			actual = reducer({
				numberOfItems: 1,
				items: {
					1: {
						id: 1,
						retailPrice: 100,
						numberOfItems: 1,
					},
				},
			}, addShoppingCartProduct(product)),
			expected = {
				numberOfItems: 2,
				items: {
					1: {
						id: 1,
						retailPrice: 100,
						numberOfItems: 2,
					},
				},
			};

		expect(actual).toEqual(expected);
	});
});
