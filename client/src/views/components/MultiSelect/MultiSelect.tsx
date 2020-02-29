import { SELECT_OPTION } from 'locale/consts';
import React from 'react';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';

import Translate from '../Translate';

const MultiSelect = ({
  label, value, options, onChange,
}: any) => (
  <FormGroup>
    {label && (
      <Label>
        <Translate id={label} />
      </Label>
    )}
    <Select
      isMulti
      value={value}
      onChange={optionsSelected => onChange(optionsSelected)}
      options={options}
      // placeholder={<Translate id={SELECT_OPTION} />}
    />
  </FormGroup>
);

export default MultiSelect;
