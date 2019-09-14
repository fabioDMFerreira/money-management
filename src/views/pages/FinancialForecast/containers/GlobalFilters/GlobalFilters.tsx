import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Select from 'react-select/lib/Creatable';
import randomColor from 'randomcolor';
import { createSliderWithTooltip, Range as SliderRange } from 'rc-slider';
import { DebounceInput } from 'react-debounce-input';

import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import styled from 'styled-components';

import { GlobalFiltersType } from 'models/GlobalFiltersType';
import { Tag } from 'models/ITag';
import Button from 'reactstrap/lib/Button';
import DateRangePicker from 'views/components/DateRangePicker';

type Props = {
  globalFilters: GlobalFiltersType,
  tags: Tag[],
  updateGlobalFilter: (keyFilter: keyof GlobalFiltersType, value: any) => any,
  createTag: (tag: Tag) => any
}

type State = {
  credit?: number[],
  debit?: number[],
}


const Range = createSliderWithTooltip(SliderRange);

const GlobalFiltersContainer = styled.div`
.form-control,.react-select__control {
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  font-size: 19px;
  line-height: 24px;
  color: #484848;
  font-weight: 200;
  height: auto;
  background-color: #fff;
}

.form-control{
  padding: 11px 11px 11px;
}

.react-select__control{
  padding: 6px 5px 8px;
}

.react-select__value-container{
  padding:0;
}

.react-select__indicator{
  padding:0;
}
`;

export default class GlobalFilters extends Component<Props, State> {

  static defaultProps = {
    globalFilters: {},
    tags: []
  }

  state = {
    credit: undefined,
    debit: undefined
  }

  render() {
    const {
      globalFilters: {
        startDate,
        endDate,
        tags: tagsSelected,
        credit,
        debit,
        description
      },
      tags,
      updateGlobalFilter,
      createTag,
    } = this.props;

    return <GlobalFiltersContainer>
      <Row>
        <Col xs={2}>
          <FormGroup>
            <Label>Description</Label>
            <DebounceInput
              element={Input}
              debounceTimeout={500}
              value={description}
              onChange={(e: any) => updateGlobalFilter('description', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Tags</Label>
            <Select
              isMulti
              classNamePrefix="react-select"
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
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label>Date range</Label><br />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              updateStartDate={(startDate) => updateGlobalFilter('startDate', startDate)}
              updateEndDate={(endDate) => updateGlobalFilter('endDate', endDate)}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Credit {
              credit ?
                <span>({credit[0]} - {credit[1]} <Button color="link" onClick={() => { updateGlobalFilter('credit', null) }}>X</Button>)</span> :
                ''
            }</Label>
            <Range
              min={0}
              max={10000}
              pushable={true}
              value={this.state.credit ? this.state.credit : credit || []}
              onChange={(value) => {
                this.setState({
                  credit: value
                });
              }}
              onAfterChange={value => {
                updateGlobalFilter('credit', value);
                this.setState({
                  credit: undefined
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Debit {
              debit ?
                <span>({debit[0]} - {debit[1]} <Button color="link" onClick={() => { updateGlobalFilter('debit', null) }}>X</Button>)</span> :
                ''
            }</Label>
            <Range
              min={0}
              max={10000}
              pushable={true}
              value={this.state.debit ? this.state.debit : debit || []}
              onChange={(value) => {
                this.setState({
                  debit: value
                });
              }}
              onAfterChange={value => {
                updateGlobalFilter('debit', value);
                this.setState({
                  debit: undefined
                });
              }}
            />
          </FormGroup>
        </Col>
      </Row>
    </GlobalFiltersContainer>
  }
}
