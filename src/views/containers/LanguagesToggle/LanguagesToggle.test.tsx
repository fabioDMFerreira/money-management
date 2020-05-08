import { render } from '@testing-library/react';
import React from 'react';

import LanguagesToggle from './LanguagesToggle';


describe('containers/LanguagesToggle', () => {
  it('should render component', () => {
    const setActiveLanguage = jest.fn();
    render((
      <LanguagesToggle languages={[]} currentLanguage={{ code: 'en' }} setActiveLanguage={setActiveLanguage} />
    ));
  });
});
