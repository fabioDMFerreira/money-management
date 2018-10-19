import React from 'react';
import { number, string, func } from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartEditProduct = ({
	numberOfItems, productId, incrementNumberOfItems, decrementNumberOfItems,
}) => (
	<div>
		<p>
			<Button onClick={() => incrementNumberOfItems(productId)}>
				<FontAwesomeIcon icon={faPlus} />
			</Button>
		</p>
		<p>{numberOfItems} <FontAwesomeIcon icon={faShoppingCart} /></p>
		<p>
			<Button onClick={() => decrementNumberOfItems(productId)}>
				<FontAwesomeIcon icon={faMinus} />
			</Button>
		</p>
	</div>
);

ShoppingCartEditProduct.propTypes = {
	productId: string.isRequired,
	numberOfItems: number.isRequired,
	incrementNumberOfItems: func.isRequired,
	decrementNumberOfItems: func.isRequired,
};

export default ShoppingCartEditProduct;

