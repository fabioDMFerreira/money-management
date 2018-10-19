import reducer from '../reducer';

import {
	updateProductNumberOfItems,
	incrementProductNumberOfItems,
	decrementProductNumberOfItems,
} from '../actions';

describe('ShoppingCartEditProduct reducer', () => {
	it('should increment product number of items in shopping cart if it exists', () => {
		let actual = reducer({}, incrementProductNumberOfItems(1)),
			expected = {};

		expect(actual).toEqual(expected);

		actual = reducer({
			numberOfItems: 2,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 2,
				},
			},
		}, incrementProductNumberOfItems(1));
		expected = {
			numberOfItems: 3,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 3,
				},
			},
		};

		expect(actual).toEqual(expected);
	});


	it('should decrement product number of items in shopping cart if it exists', () => {
		let actual = reducer({}, decrementProductNumberOfItems(1)),
			expected = {};

		expect(actual).toEqual(expected);

		actual = reducer({
			numberOfItems: 2,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 2,
				},
			},
		}, decrementProductNumberOfItems(1));
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
	});

	it('should update product number of items in shopping cart if it exists', () => {
		let actual = reducer({}, updateProductNumberOfItems(1, 3)),
			expected = {};

		expect(actual).toEqual(expected);

		actual = reducer({
			numberOfItems: 3,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 3,
				},
			},
		}, updateProductNumberOfItems(1, 5));
		expected = {
			numberOfItems: 5,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 5,
				},
			},
		};

		expect(actual).toEqual(expected);

		actual = reducer({
			numberOfItems: 14,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 3,
				},
				2: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 5,
				},
				3: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 6,
				},
			},
		}, updateProductNumberOfItems(1, 1));
		expected = {
			numberOfItems: 12,
			items: {
				1: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 1,
				},
				2: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 5,
				},
				3: {
					id: 1,
					retailPrice: 100,
					numberOfItems: 6,
				},
			},
		};

		expect(actual).toEqual(expected);
	});

	it('should remove item from list if there isn\'t any item on decrementing product', () => {
		const actual = reducer({
				numberOfItems: 1,
				items: {
					1: {
						id: 1,
						retailPrice: 100,
						numberOfItems: 1,
					},
				},
			}, decrementProductNumberOfItems(1)),
			expected = {
				numberOfItems: 0,
				items: {},
			};
		expect(actual).toEqual(expected);
	});
});
