import React, { Component } from 'react';
import Input from 'reactstrap/lib/Input';

import EditableInputHoc from 'views/hocs/EditableInputHoc';

const EditableInput = EditableInputHoc(Input);

export default class FilterComponent extends Component<any> {
	render() {
		const { onChange, filter } = this.props;

		return (<EditableInput
			value={filter ? filter.value : ''}
			onBlur={
				(e: any) => {
					onChange(e.target.value);
				}
			}
		        />);
	}
}
