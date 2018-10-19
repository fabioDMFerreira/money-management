import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { generateKey } from 'services/utils';
import { LOADING, NO_RESULTS_FOUND } from 'locale/consts';
import Translate from 'components/Translate';
import { ProductsList as ProductsListType, productsFilters as productsFiltersType } from 'propTypes/products';
import ProductDetails from 'components/ProductDetails';
import ShoppingCartAddProduct from 'components/ShoppingCartAddProduct';
import { searchProducts } from 'store/rent/thunks';

import Filters from './Filters';

function handleFilters(filters) {
	const handledFilters = {};

	// need handle categories values because multiselect values have incorrect api required format
	if (filters.categories) {
		handledFilters.categories = filters.categories
			.map(option => option.label);
	}

	if (filters.sizes) {
		handledFilters.sizes = filters.sizes
			.map(option => option.label);
	}

	if (filters.colors) {
		handledFilters.colors = filters.colors
			.map(option => option.label);
	}

	if (filters.sort) {
		handledFilters.sort = filters.sort.value;
	}

	return {
		...filters,
		...handledFilters,
	};
}

class ProductsList extends Component {
	static propTypes = {
		products: ProductsListType,
		getProducts: func.isRequired,
		getProductsRequestStatus: string,
		getProductsRequestErrorMessage: string,
		productsFilters: productsFiltersType,
	};

	static defaultProps = {
		products: [],
		getProductsRequestStatus: '',
		getProductsRequestErrorMessage: '',
		productsFilters: {},
	};

	componentDidMount() {
		const {
			getProducts, productsFilters,
		} = this.props;
		getProducts(handleFilters(productsFilters));
	}

	componentWillReceiveProps(nextProps) {
		const { productsFilters, getProducts } = this.props;

		if (nextProps.productsFilters !== productsFilters) {
			getProducts(handleFilters(nextProps.productsFilters));
		}
	}

	render() {
		const {
			products,
			getProductsRequestStatus,
			getProductsRequestErrorMessage,
			productsFilters,
		} = this.props;

		return (
			<div>
				<Filters filters={productsFilters} />
				{
					(() => {
						switch (getProductsRequestStatus) {
						case 'pending':
							return <Translate id={LOADING} />;
						case 'success':
							if (!products || !products.length) {
								return <Translate id={NO_RESULTS_FOUND} />;
							}

							return products.map(product =>
								(
									<Container className="rent-list-product-container" key={generateKey(product.id)} >
										<Row>
											<Col md="11">
												<ProductDetails product={product} />
											</Col>
											<Col md="auto" className="text-right">
												<ShoppingCartAddProduct product={product} />
											</Col>
										</Row>
									</Container>));
						case 'error':
							return <Translate id={getProductsRequestErrorMessage} />;
						default:
							return '';
						}
					})()
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		rent: {
			products,
			getProductsRequestStatus,
			getProductsRequestErrorMessage,
			productsFilters,
		},
	} = state;

	return {
		products,
		getProductsRequestStatus,
		getProductsRequestErrorMessage,
		productsFilters,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProducts: values => dispatch(searchProducts(values)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
