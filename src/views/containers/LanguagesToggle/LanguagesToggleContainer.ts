import { connect } from 'react-redux';
import { getLanguages, getActiveLanguage, setActiveLanguage } from 'react-localize-redux';

import { LANGUAGE_CODE } from 'localstorage/consts';

import LanguagesToggle from './LanguagesToggle';

function mapStateToProps(state: any) {
	return {
		languages: getLanguages(state.localize),
		currentLanguage: getActiveLanguage(state.localize),
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		setActiveLanguage: (language: any) => {
			window.localStorage.setItem(LANGUAGE_CODE, language);
			dispatch(setActiveLanguage(language));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesToggle);
