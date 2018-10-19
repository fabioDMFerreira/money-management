import React from 'react';
import { object } from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import { NO_RESULTS_FOUND } from 'locale/consts';
import Translate from 'components/Translate';
import ProductDetails from 'components/ProductDetails';
import { generateKey } from 'services/utils';

import ShoppingCartEditProduct from '../ShoppingCartEditProduct';

const ShoppingCartProductsList = ({ items }) => (
	<div>
		{
			(() => {
				const productsIds = Object.keys(items);

				if (!productsIds.length) {
					return <Translate id={NO_RESULTS_FOUND} />;
				}

				return productsIds.map(productId => (
					<Container className="shopping-cart-list-product" key={generateKey(productId)}>
						<Row>
							<Col md="11">
								<ProductDetails product={items[productId]} />
							</Col>
							<Col md="auto" className="text-right">
								<ShoppingCartEditProduct productId={productId} numberOfItems={items[productId].numberOfItems} />
							</Col>
						</Row>
					</Container>
				));
			})()
		}
	</div>
);

ShoppingCartProductsList.propTypes = {
	items: object,
};

ShoppingCartProductsList.defaultProps = {
	items: {},
};

export default ShoppingCartProductsList;
