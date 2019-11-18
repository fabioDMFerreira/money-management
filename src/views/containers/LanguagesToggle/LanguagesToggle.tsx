import React from 'react';

import './LanguagesToggle.css';
import { Language } from 'react-localize-redux';
import Button from 'reactstrap/lib/Button';

interface Props {
	languages: Language[],
	currentLanguage: { code: string },
	setActiveLanguage: (code: string) => void,
}

const LanguagesToggle = ({ currentLanguage, languages, setActiveLanguage }: Props) => (
	<React.Fragment>
		{
			languages.map(language =>
				(
					<React.Fragment>
						<Button
							color="link"
							small
							className={
								`language-badge ${currentLanguage.code === language.code ?
									'active' : ''
								}`}
							key={language.code}
							onClick={() => setActiveLanguage(language.code)}
							onKeyDown={() => setActiveLanguage(language.code)}
						>
							{language.name}
						</Button>{' '}
					</React.Fragment>
				))
		}
	</React.Fragment>
);

export default LanguagesToggle;
