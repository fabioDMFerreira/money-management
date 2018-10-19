import { shape, arrayOf, string, number } from 'prop-types';

export const ProductOfList = shape({
		productProfileMediaPhotos: arrayOf(string),
		label: string,
		description: string,
		price: number,
		totalSales: number,
		designerName: string,
		id: number,
		score: number,
	}),
	ProductsList = arrayOf(ProductOfList),
	productsFilters = shape({
		category: string,
		size: string,
	});
