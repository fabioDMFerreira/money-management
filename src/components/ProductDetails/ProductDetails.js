import React from 'react';
import { Row, Col, Container } from 'reactstrap';

import { ProductOfList as ProductOfListType } from 'propTypes/products';

const ProductDetails = ({
	product: {
		productProfileMediaPhotos,
		label,
		description,
	},
}) => (
	<Container className="product-details">
		<Row >
			{
				(() => {
					if (productProfileMediaPhotos && productProfileMediaPhotos.length) {
						return (
							<Col md="auto">
								<img src={productProfileMediaPhotos[0]} alt="product" />
							</Col>
						);
					}

					return <Col md="auto" />;
				})()
			}
			<Col md="9">
				<h4>{label}</h4>
				{
					description &&
						<small>{description}</small>
				}
			</Col>
		</Row>
	</Container>
);

ProductDetails.propTypes = {
	product: ProductOfListType.isRequired,
};


export default ProductDetails;
