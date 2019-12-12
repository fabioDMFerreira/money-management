export default (csv: string): any => {
	let delimiter: string = ',';
	const commaCounter = (csv.match(/,/g) || []).length;
	const semiCollonCounter = (csv.match(/;/g) || []).length;

	if (semiCollonCounter > commaCounter) {
		delimiter = ';';
	}

	const lines = csv.split('\n');

	return lines.map(line => line.split(delimiter).map(str => (str ? str.replace(/"/g, '') : '')));
};
