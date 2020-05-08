import { render } from '@testing-library/react';
import React from 'react';

import TagSelect from './TagSelect';


describe('containers/TagSelect', () => {
  it('should render component', () => {
    const onChange = jest.fn();
    const createTag = jest.fn();
    render((
      <TagSelect onChange={onChange} createTag={createTag} tags={[]} tagsSelected={[]} />
    ));
  });
});
