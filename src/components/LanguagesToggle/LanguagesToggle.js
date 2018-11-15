import React from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

import { generateKey } from 'services/utils';

import './LanguagesToggle.css';

const LanguagesToggle = ({ currentLanguage, languages, setActiveLanguage }) => (
	<React.Fragment>
		{
			languages.map(
				language =>
					<React.Fragment>
						<span
							className={'language-badge ' + (currentLanguage.code === language.code ? 'active' : '')}
							key={generateKey(language.code)}
							onClick={() => setActiveLanguage(language.code)}
						>
							{language.name}
						</span>{' '}
					</React.Fragment>
			)
		}
	</React.Fragment>
);

LanguagesToggle.propTypes = {
	languages: arrayOf(shape({ code: string, name: string })).isRequired,
	currentLanguage: shape({ code: string }).isRequired,
	setActiveLanguage: func.isRequired,
};

export default LanguagesToggle;
