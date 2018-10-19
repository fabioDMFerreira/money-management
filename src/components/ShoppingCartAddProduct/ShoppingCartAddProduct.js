import React from 'react';
import { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

import { ProductOfList as ProductOfListType } from 'propTypes/products';

const ShoppingCartAddProduct = ({ product, addProductToShoppingCart }) => (
	<div>
		{
			product.price &&
			<p><big>{product.price}€</big></p>
		}
		<Button onClick={() => addProductToShoppingCart(product)}>
			<FontAwesomeIcon icon={faShoppingCart} />
		</Button>
	</div>
);

ShoppingCartAddProduct.propTypes = {
	product: ProductOfListType.isRequired,
	addProductToShoppingCart: func.isRequired,
};

export default ShoppingCartAddProduct;
