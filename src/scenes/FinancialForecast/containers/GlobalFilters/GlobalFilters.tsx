import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Select from 'react-select/lib/Creatable';
import randomColor from 'randomcolor';

import { GlobalFiltersType } from './GlobalFiltersType';
import { TagType } from 'scenes/FinancialForecast/TagType';
import EditableInputHoc from 'hocs/EditableInputHoc';

type Props = {
  globalFilters: GlobalFiltersType,
  tags: TagType[],
  updateGlobalFilter: (keyFilter: keyof GlobalFiltersType, value: any) => any,
  createTag: (tag: TagType) => any
}

const EditableInput = EditableInputHoc(Input);

export default class GlobalFilters extends Component<Props> {
  render() {
    const {
      globalFilters: {
        startDate,
        endDate,
        tags: tagsSelected
      },
      tags,
      updateGlobalFilter,
      createTag,
    } = this.props;

    return <Row>
      <Col xs="4">
        <EditableInput
          type="date"
          value={startDate}
          onBlur={(e: any) => {
            const value = e.target.value;

            if (!value || !/[1-2][0-9]{3}-[0-9]{2}-[0-9]{2}/.exec(value)) {
              return updateGlobalFilter('startDate', value);
            }

            return updateGlobalFilter('startDate', value);
          }}
        />
      </Col>
      <Col xs="4">
        <EditableInput
          type="date"
          value={endDate}
          onBlur={
            (e: any) => {
              const value = e.target.value;

              if (!value || !/[1-2][0-9]{3}-[0-9]{2}-[0-9]{2}/.exec(value)) {
                return updateGlobalFilter('endDate', value);
              }

              return updateGlobalFilter('endDate', value);
            }
          }
        />
      </Col>
      <Col xs={3}>
        <Select
          isMulti
          value={tagsSelected}
          onChange={(value) => {
            updateGlobalFilter('tags', value)
          }}
          options={[{ label: 'Unsassigned', value: 'null' }, ...tags]}
          placeholder={"Select tags"}
          onCreateOption={newOptionLabel => {
            const newOption = { label: newOptionLabel, value: newOptionLabel.toLowerCase(), color: randomColor() }
            createTag(newOption);
            updateGlobalFilter("tags", [
              ...(tagsSelected && tagsSelected instanceof Array ? tagsSelected : []),
              newOption
            ]);
          }}
        />
      </Col>
    </Row>
  }
}
