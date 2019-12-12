import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import ReactSelect from 'react-select';


// import { SELECT_OPTION } from 'locale/consts';

import Translate from '../Translate';

interface Props {
	label?: string,
	value: string,
	options: string[],
	onChange: (option: string) => void
}

const Select = ({
	label, value, options, onChange,
}: Props) => (
	<FormGroup>
		{label && <Label><Translate id={label} /></Label>}
		<ReactSelect
			value={value}
			onChange={(optionsSelected: any) => onChange(optionsSelected)}
			options={options}
			// placeholder={<Translate id={SELECT_OPTION} />}
		/>
	</FormGroup>
);

export default Select;
