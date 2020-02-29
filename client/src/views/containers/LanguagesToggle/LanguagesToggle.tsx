import './LanguagesToggle.css';

import React from 'react';
import { Language } from 'react-localize-redux';
import Button from 'reactstrap/lib/Button';

interface Props {
  languages: Language[];
  currentLanguage: { code: string };
  setActiveLanguage: (code: string) => void;
}

const LanguagesToggle = ({ currentLanguage, languages, setActiveLanguage }: Props) => (
  <React.Fragment>
    {
      languages.map(language =>
        (
          <Button
            color="link"
            size="sm"
            className={
              `language-badge ${currentLanguage.code === language.code ?
                'active' : ''
              }`}
            key={language.code}
            onClick={() => setActiveLanguage(language.code)}
            onKeyDown={() => setActiveLanguage(language.code)}
          >
            {language.name}
          </Button>
        ))
    }
  </React.Fragment>
);

export default LanguagesToggle;
