import { render } from '@testing-library/react';
import React from 'react';

import EditableInputHoc from './EditableInputHoc';


describe('components/EditableInputHoc', () => {
  it('should render component', () => {
    const Input = EditableInputHoc('input');
    render(<Input />);
  });
});
