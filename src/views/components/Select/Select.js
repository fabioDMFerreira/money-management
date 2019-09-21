import React from 'react';
import { string, func } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import ReactSelect from 'react-select';


import { SELECT_OPTION } from 'locale/consts';

import { selectItem, selectItemsList } from 'propTypes';

import Translate from '../Translate';

const Select = ({
	label, value, options, onChange,
}) => (
		<FormGroup>
			{label && <Label><Translate id={label} /></Label>}
			<ReactSelect
				value={value}
				onChange={optionsSelected => onChange(optionsSelected)}
				options={options}
				placeholder={<Translate id={SELECT_OPTION} />}
			/>
		</FormGroup>
	);

Select.propTypes = {
	label: string,
	value: selectItem,
	options: selectItemsList,
	onChange: func,
};

Select.defaultProps = {
	label: '',
	value: {},
	options: [],
	onChange: () => { },
};

export default Select;
