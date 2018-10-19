import React from 'react';
import { string, func } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

import { SELECT_OPTION } from 'locale/consts';
import { selectItemsList } from 'propTypes';

import Translate from '../Translate';

const MultiSelect = ({
	label, value, options, onChange,
}) => (
	<FormGroup>
		{label && <Label><Translate id={label} /></Label>}
		<Select
			isMulti
			value={value}
			onChange={optionsSelected => onChange(optionsSelected)}
			options={options}
			placeholder={<Translate id={SELECT_OPTION} />}
		/>
	</FormGroup>
);

MultiSelect.propTypes = {
	label: string,
	value: selectItemsList,
	options: selectItemsList,
	onChange: func,
};

MultiSelect.defaultProps = {
	label: '',
	value: [],
	options: [],
	onChange: () => {},
};

export default MultiSelect;
