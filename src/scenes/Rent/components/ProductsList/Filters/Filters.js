import React from 'react';
import { func, shape } from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

import { PRODUCT_SIZE, PRODUCT_CATEGORY, CLEAR_FILTERS, ORDER_BY, PRODUCT_COLOR } from 'locale/consts';
import Translate from 'components/Translate';

import MultiSelect from 'components/MultiSelect';
import Select from 'components/Select';

import { selectItem, selectItemsList } from 'propTypes';
import { generateKey } from 'services/utils';


import orderOptions from './orderOptions';

const Filters = ({
	updateFilter, clearFilters, filtersOptions, productsFilters,
}) => (
	<Row>
		{
			// List all filters
			(
				() => Object.keys(filtersOptions)
					.map((filter) => {
						const options = filtersOptions[filter];

						// return right component for each kind of filter
						switch (filter) {
						case 'sizes':
							return (
								<Col md="3" key={generateKey(filter)} >
									<MultiSelect label={PRODUCT_SIZE} value={productsFilters.sizes} options={options} onChange={value => updateFilter('sizes', value)} />
								</Col>
							);
						case 'colors':
							return (
								<Col md="3" key={generateKey(filter)}>
									<MultiSelect label={PRODUCT_COLOR} value={productsFilters.colors} options={options} onChange={value => updateFilter('colors', value)} />
								</Col>
							);
						case 'categories':
							return (
								<Col md="3" key={generateKey(filter)}>
									<MultiSelect label={PRODUCT_CATEGORY} value={productsFilters.categories} options={options} onChange={value => updateFilter('categories', value)} />
								</Col>
							);
						default:
						}

						return `Filter ${filter} is not listed in Filters component.`;
					})

			)()
		}


		<Col md="3">
			<Select label={ORDER_BY} value={productsFilters.sort} options={orderOptions} onChange={value => updateFilter('sort', value)} />
		</Col>
		<Col md="3">
			<Button onClick={clearFilters}><Translate id={CLEAR_FILTERS} /></Button>
		</Col>
	</Row>
);

Filters.propTypes = {
	filtersOptions: shape({
		categories: selectItemsList,
		sizes: selectItemsList,
		colors: selectItemsList,
	}),
	updateFilter: func,
	clearFilters: func,
	productsFilters: shape({
		colors: selectItemsList,
		categories: selectItemsList,
		sizes: selectItemsList,
		sort: selectItem,
	}),
};

Filters.defaultProps = {
	filtersOptions: {},
	updateFilter: () => { },
	clearFilters: () => { },
	productsFilters: {},
};

export default Filters;
