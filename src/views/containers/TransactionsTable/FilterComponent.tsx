import React from 'react';
import Input from 'reactstrap/lib/Input';
import EditableInputHoc from 'views/components/EditableInputHoc/EditableInputHoc';

const EditableInput = EditableInputHoc(Input);

export default ({ onChange, filter }: any) => (
  <EditableInput
    value={filter ? filter.value : ''}
    onBlur={
      (e: any) => {
        onChange(e.target.value);
      }
    }
  />
);
