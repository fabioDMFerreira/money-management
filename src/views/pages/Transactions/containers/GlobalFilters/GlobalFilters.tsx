

import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalFilters } from 'models/GlobalFilters';
import { Tag } from 'models/Tag';
import { createSliderWithTooltip, Range as SliderRange } from 'rc-slider';
import React, { ChangeEvent, Component, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import Collapse from 'reactstrap/lib/Collapse';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import DateRangePicker from 'views/components/DateRangePicker';
import ToggleButton from 'views/components/ToggleButton';

import TagSelect from '../../../../containers/TagSelect';
import WalletSelect from '../../../../containers/WalletSelect';


type Props = {
  globalFilters: GlobalFilters;
  updateGlobalFilter: (keyFilter: keyof GlobalFilters, value: any) => any;
  transactionsCount: number;
  allTransactionsCount: number;
}

type State = {
  credit?: number[];
  debit?: number[];
  collapse: boolean;
}


const Range = createSliderWithTooltip(SliderRange);

export default class GlobalFiltersComponent extends Component<Props, State> {
  static defaultProps = {
    globalFilters: {},
  }

  state = {
    credit: undefined,
    debit: undefined,
    collapse: false,
  }

  render() {
    const {
      globalFilters: {
        startDate,
        endDate,
        tags: tagsSelected,
        credit,
        debit,
        description,
        wallet,
        hideInternalTransactions,
      },
      transactionsCount,
      allTransactionsCount,
      updateGlobalFilter,
    } = this.props;

    return (
      <div>
        <div>
          <ToggleButton
            active={allTransactionsCount !== transactionsCount}
            text={
              allTransactionsCount === transactionsCount ?
                ' Filter' :
                ` Displaying ${transactionsCount} of ${allTransactionsCount} transactions.`
            }
            onClick={() => this.setState({ collapse: !this.state.collapse })}
            icon={faFilter}
          />
        </div>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
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
                    <TagSelect
                      classNamePrefix="react-select"
                      tagsSelected={tagsSelected || []}
                      onChange={value => updateGlobalFilter('tags', value)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <Label>Wallet</Label>
                    <WalletSelect
                      classNamePrefix="react-select"
                      walletSelected={wallet || ''}
                      onChange={(option: any) => updateGlobalFilter('wallet', option.value || '')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="3">
                  <FormGroup>
                    <Label>Date range</Label><br />
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      updateStartDate={startDate => updateGlobalFilter('startDate', startDate)}
                      updateEndDate={endDate => updateGlobalFilter('endDate', endDate)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <Label>Credit {
                      credit ?
                        <span>
                          (
                          {credit[0]} - {credit[1]}
                          {' '}
                          <Button color="link" onClick={() => { updateGlobalFilter('credit', null); }}>X</Button>
                          )
                        </span>
                        :
                        ''
                    }
                    </Label>
                    <Range
                      min={0}
                      max={10000}
                      pushable
                      value={this.state.credit ? this.state.credit : credit || []}
                      onChange={(value) => {
                        this.setState({
                          credit: value,
                        });
                      }}
                      onAfterChange={(value) => {
                        updateGlobalFilter('credit', value);
                        this.setState({
                          credit: undefined,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <Label>Debit {
                      debit ?
                        <span>(
                          {debit[0]} - {debit[1]}
                          {' '}
                          <Button color="link" onClick={() => { updateGlobalFilter('debit', null); }}>X</Button>)
                        </span>
                        :
                        ''
                    }
                    </Label>
                    <Range
                      min={0}
                      max={10000}
                      pushable
                      value={this.state.debit ? this.state.debit : debit || []}
                      onChange={(value) => {
                        this.setState({
                          debit: value,
                        });
                      }}
                      onAfterChange={(value) => {
                        updateGlobalFilter('debit', value);
                        this.setState({
                          debit: undefined,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <Label check>
                    <Input
                      checked={hideInternalTransactions}
                      onChange={
                        (e: ChangeEvent<HTMLInputElement>) => {
                          updateGlobalFilter('hideInternalTransactions', e.target.checked);
                        }
                      }
                      type="checkbox"
                      id="isInternalCheckbox"
                    />{' '}
                    Hide Internal Transactions
                  </Label>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}
