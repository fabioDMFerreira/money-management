import React from 'react';
import { string } from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';


const TranslateComponent = ({ id }) => id && <Translate id={id} />;

TranslateComponent.propTypes = {
	id: string.isRequired,
	children: string,
};

TranslateComponent.defaultProps = {
	children: '',
};

export default withLocalize(TranslateComponent);
