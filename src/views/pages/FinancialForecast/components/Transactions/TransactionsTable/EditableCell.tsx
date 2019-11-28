import React from 'react';
import Input from 'reactstrap/lib/Input';

import EditableInputHoc from 'views/hocs/EditableInputHoc';

const EditableInput = EditableInputHoc(Input);

interface Props {
  type?: "text" | "date" | "number" | "multiselect"
  update: (id: string, value: string, key: string) => void
  cellInfo: any
}

export default ({ type, cellInfo, update }: Props) => {

  switch (type) {
    case 'date':
      return <EditableInput
        type='date'
        value={cellInfo.value}
        onBlur={(e: any) => {
          const value = e.target.value;

          if (!value || !/[1-2][0-9]{3}-[0-9]{2}-[0-9]{2}/.exec(value)) {
            return update(cellInfo.original.id, '', cellInfo.column.id);
          }

          return update(cellInfo.original.id, value, cellInfo.column.id);
        }}
      />;
    default:
      return <EditableInput
        type={type || 'text'
        }
        value={cellInfo.value}
        onBlur={(e: any) => {
          update(cellInfo.original.id, e.target.value, cellInfo.column.id)
        }}
      />;
  }
}
