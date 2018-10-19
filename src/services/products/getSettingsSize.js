import axios from 'axios';

import { API_URL } from './config';
import { extractDataFromApiRequest } from '../utils';

export default () => axios.get(`${API_URL}/settingsSize`)
	.then(extractDataFromApiRequest);

