import { getOptionsFromFilterSettings } from '../FiltersContainer';

describe('FiltersContainer', () => {
	it('getOptionsFromFiltersSettings should format settings in right format to be used by select component', () => {
		let actual = getOptionsFromFilterSettings(),
			expected = {};

		expect(actual).toEqual(expected);

		actual = getOptionsFromFilterSettings({
			colors: {
				Red: 1,
				Black: 2,
			},
			categories: {
				cat1: 0,
				cat2: 1,
			},
		});
		expected = {
			colors: [{ label: 'Red', value: 1 }, { label: 'Black', value: 2 }],
			categories: [{ label: 'cat1', value: 0 }, { label: 'cat2', value: 1 }],
		};

		expect(actual).toEqual(expected);
	});
});
