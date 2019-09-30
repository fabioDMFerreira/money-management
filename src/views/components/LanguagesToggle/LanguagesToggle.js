import React from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

import { generateKey } from 'models/utils';

import './LanguagesToggle.css';

const LanguagesToggle = ({ currentLanguage, languages, setActiveLanguage }) => (
	<React.Fragment>
		{
			languages.map(language =>
				(
					<React.Fragment>
						<a
							href="javascrip:void(0)"
							className={
								`language-badge ${currentLanguage.code === language.code ?
									'active' : ''
								}`}
							key={generateKey(language.code)}
							onClick={() => setActiveLanguage(language.code)}
							onKeyDown={() => setActiveLanguage(language.code)}
						>
							{language.name}
						</a>{' '}
					</React.Fragment>
				))
		}
	</React.Fragment>
);

LanguagesToggle.propTypes = {
	languages: arrayOf(shape({ code: string, name: string })).isRequired,
	currentLanguage: shape({ code: string }).isRequired,
	setActiveLanguage: func.isRequired,
};

export default LanguagesToggle;
