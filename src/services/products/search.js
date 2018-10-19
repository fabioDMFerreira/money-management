import axios from 'axios';

import { API_URL } from './config';
import { extractDataFromApiRequest } from '../utils';


// import allProducts from './mocks/allProducts';
// import filteredByCategory from './mocks/filteredByCategory';
// import filteredBySize from './mocks/filteredBySize';
// import filteredByCategoryAndSize from './mocks/filteredByCategoryAndSize';

/**
* Products Filters
* @typedef {Object} ProductsFilters
* @param {string} category
* @param {string} size
*/

/**
 * @param {ProductsFilters} filters
 */
export default filters => axios.post(`${API_URL}/products/search`, { ...filters })
	.then(extractDataFromApiRequest);


// new Promise((accept) => {
// 	setTimeout(() => {
// 		if (!filters || (!filters.category && !filters.size)) {
// 			return accept(allProducts);
// 		} else if (filters.category && !filters.size) {
// 			return accept(filteredByCategory);
// 		} else if (filters.size && !filters.category) {
// 			return accept(filteredBySize);
// 		}
// 		return accept(filteredByCategoryAndSize);
// 	}, 500);
// });

