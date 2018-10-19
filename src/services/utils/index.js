import { NETWORK_NOT_FOUND } from 'locale/consts';

export { default as generateKey } from './generateKey';

export const extractDataFromApiRequest = response => (response.data.data ? response.data.data : response.data),
	extractResultsFromElasticsearchOutput = (response) => {
		if (!response || !response.data || !response.data.hits) {
			throw new Error(NETWORK_NOT_FOUND);
		}

		return response.data.hits.map(hit => hit.source);
	};

