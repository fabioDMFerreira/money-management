import { shape, string, number, oneOfType } from 'prop-types';

export default shape({
	label: string,
	value: oneOfType([string, number]),
});

