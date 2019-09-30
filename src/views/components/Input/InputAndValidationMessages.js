/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { string, object, func } from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { generateKey } from 'models/utils';
import Translate from 'components/Translate';

const InputAndValidationMessages = ({
	input,
	type,
	meta: { touched, error, warning },
	translate,
}) => (
	<div>
		<input className="form-control" {...input} type={type} />
		{
			(() => {
				if (touched && error && error.length) {
					return error.map(message => <p key={generateKey(message)}><Translate id={message} /></p>);
				} else if (touched && warning && warning.length) {
					return warning.map(message => <p key={generateKey(message)}>{translate(message)}</p>);
				}
				return <span />;
			})()
		}
	</div>
);

InputAndValidationMessages.propTypes = {
	input: object.isRequired,
	type: string.isRequired,
	meta: object.isRequired,
	translate: func.isRequired,
};

export default withLocalize(InputAndValidationMessages);
