import { render } from '@testing-library/react';
import React from 'react';

import EditableRemovableListItem from '.';

interface El {
  label: string;
}

describe('components/EditableRemovableListItem', () => {
  it('should render', () => {
    const element: El = { label: 'element' };
    const update = jest.fn();
    const remove = jest.fn();
    render(<EditableRemovableListItem<El> element={element} update={update} remove={remove} label={element.label} />);
  });
});
