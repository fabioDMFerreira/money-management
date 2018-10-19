import React from 'react';

import { RENT } from 'locale/consts';
import Translate from 'components/Translate';

import ProductsList from './components/ProductsList';


const Rent = () => (
	<div>
		<h1><Translate id={RENT} /></h1>
		<ProductsList />
	</div>
);


export default Rent;
