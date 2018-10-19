import React from 'react';
import { arrayOf, string, func, shape } from 'prop-types';
import { Button } from 'reactstrap';

import { generateKey } from 'services/utils';

import './LanguagesToggle.css';

const LanguagesToggle = ({ currentLanguage, languages, setActiveLanguage }) => (
	<ul id="languages-toggle">
		{
			languages.map(language =>
				<li className={currentLanguage.code === language.code ? 'active' : ''} key={generateKey(language.code)}><Button color="link" onClick={() => setActiveLanguage(language.code)}>{language.name}</Button></li>)
		}
	</ul>
);

LanguagesToggle.propTypes = {
	languages: arrayOf(shape({ code: string, name: string })).isRequired,
	currentLanguage: shape({ code: string }).isRequired,
	setActiveLanguage: func.isRequired,
};

export default LanguagesToggle;
