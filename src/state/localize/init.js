import { initialize, addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';

import en from 'locale/en';
import pt from 'locale/pt';

import { LANGUAGE_CODE } from 'localstorage/consts';

export default (dispatch) => {
	const languages = [{
		name: 'EN',
		code: 'en',
	}, {
		name: 'PT',
		code: 'pt',
	}];


	const activeLanguage = window.localStorage.getItem(LANGUAGE_CODE) || languages[0].code;

	dispatch(initialize({
		languages,
		options: { renderToStaticMarkup: false },
	}));

	dispatch(addTranslationForLanguage(en, 'en'));
	dispatch(addTranslationForLanguage(pt, 'pt'));

	dispatch(setActiveLanguage(activeLanguage));
};

