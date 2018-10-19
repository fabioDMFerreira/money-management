import { connect } from 'react-redux';

import { updateListOfProductsFilter, clearListOfProductsFilters } from 'store/rent/actions';


import Filters from './Filters';

export function getOptionsFromFilterSettings(filtersSettings) {
	if (!filtersSettings || !(filtersSettings instanceof Object)) {
		return {};
	}

	// i.e. reduce transforms ['colors','categories'] into {'colors':options,'categories':options}
	return Object.keys(filtersSettings)
		.reduce((options, filter) => {
			const filterOptions = filtersSettings[filter],
				labels = Object.keys(filterOptions),
				// create array with options in format in select component
				optionsWithRightFormat = labels.map(label => ({ label, value: filterOptions[label] }));

			return {
				...options,
				[filter]: optionsWithRightFormat,
			};
		}, {});
}

function mapStateToProps(state) {
	const { filtersSettings } = state.rent,
		filtersOptions = getOptionsFromFilterSettings(filtersSettings);

	if (state.rent.productsFilters) {
		const { rent: { productsFilters } } = state;

		return {
			productsFilters,
			filtersOptions,
		};
	}


	return {
		filtersOptions,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateFilter: (filter, value) => dispatch(updateListOfProductsFilter(filter, value)),
		clearFilters: () => dispatch(clearListOfProductsFilters()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
