import React, { Component } from 'react';
import ReactTable, { SortingRule, Column } from 'react-table';
import styled from 'styled-components';
import Input from 'reactstrap/lib/Input';
import randomColor from 'randomcolor';

import TransactionData from '../../TransactionDataInterface';
import TransactionsTableRowActions from './TransactionsTableRowActions';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragTrComponent, DropTbodyComponent } from './DragComponents';
import { dragTransaction, updateTransaction, createTag, updateTransactionsFilters, filterType } from 'scenes/FinancialForecast/FinancialForecastActions';
import Select from 'react-select/lib/Creatable';
import { ValueType } from 'react-select/lib/types';
import { TagType } from 'scenes/FinancialForecast/TagType';
import EditableInputHOC from './EditableInputHoc';
import FilterComponent from './FilterComponent';

const TransactionsTableContainer = styled.div`
  &&&&{
    .rt-td{
      padding:4px 4px 1px 4px;
    }

    .form-control{
      border-radius:0px;
      border:0px;
      line-height:1.5;
    }

    .not-visible-transaction{
      background-color: #f4f4f4;

      .form-control{
        background-color: #f4f4f4;
      }
    }
  }
`;

const NotEditableCell = styled.span`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  display: block;
  color: rgb(73, 80, 87);
`;

type Props = {
  transactions: TransactionData[],
  removeTransaction: (transactionId: string) => void
  updateTransaction: typeof updateTransaction,
  dragTransaction: typeof dragTransaction,
  createTag: typeof createTag,
  tags: TagType[],
  updateTransactionsFilters: typeof updateTransactionsFilters,
  filters: filterType[]
};

type State = {
  sorted: SortingRule[],
  columns: object[],
};

const EditableInput = EditableInputHOC(Input);
export default class TransactionsTable extends Component<Props, State> {

  tagsFieldRef: { [key: string]: any } = {};

  state = {
    sorted: [],
    columns: [] as object[],
  }

  constructor(props: Props) {
    super(props);

    this.state.columns = this.buildColumns(props);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tags !== this.props.tags) {
      this.setState({
        columns: this.buildColumns(this.props)
      });
    }
  }

  editableCell = (cellInfo: any, type: "text" | "date" | "number" | "multiselect") => {

    switch (type) {
      case 'date':
        return <EditableInput
          type='date'
          value={cellInfo.value}
          onBlur={(e: any) => {
            const value = e.target.value;

            if (!value || !/[1-2][0-9]{3}-[0-9]{2}-[0-9]{2}/.exec(value)) {
              return this.props.updateTransaction(cellInfo.original.id, '', cellInfo.column.id);
            }

            return this.props.updateTransaction(cellInfo.original.id, value, cellInfo.column.id);
          }}
        />;
      case 'multiselect':
        const { tags, createTag } = this.props;

        return <Select
          options={tags}
          onChange={
            (value: ValueType<{ value: string, label: string, color?: string }>) => {
              this.props.updateTransaction(cellInfo.original.id, value, cellInfo.column.id);
              setTimeout(() => {
                this.tagsFieldRef[cellInfo.index] && this.tagsFieldRef[cellInfo.index].focus();
              }, 0);
            }
          }
          value={
            cellInfo.value
          }
          ref={ref => { this.tagsFieldRef[cellInfo.index] = ref }}
          onCreateOption={(newOptionLabel: string) => {
            const newOption = { label: newOptionLabel, value: newOptionLabel.toLowerCase(), color: randomColor() }
            createTag(newOption);
            setTimeout(() => {
              this.props.updateTransaction(cellInfo.original.id, [...cellInfo.value, newOption], cellInfo.column.id);
              this.tagsFieldRef[cellInfo.index] && this.tagsFieldRef[cellInfo.index].focus();
            }, 0);
          }}
          isMulti
        />
      default:
        return <EditableInput
          type={type || 'text'
          }
          value={cellInfo.value}
          onBlur={(e: any) => {
            this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
          }}
        />;
    }
  }

  buildColumns(props: Props): Column<any>[] {
    return [
      {
        Header: 'Description',
        accessor: "description",
        Cell: (props: any) => this.editableCell(props, 'text'),
        width: 250,
      }, {
        Header: 'Tags',
        accessor: "tags",
        filterable: true,
        filterMethod: (filter: any, row: any, column: any) => {
          const { value } = filter;
          return row.tags && !!row.tags.find((tag: TagType) => tag.value.startsWith(value.toLowerCase()));
        },
        Cell: (props: any) => this.editableCell(props, 'multiselect'),
        getProps: () => {
          return {
            style: {
              overflow: 'visible',
            }
          };
        }
      }, {
        Header: 'Start date',
        accessor: "startDate",
        Cell: (props: any) => this.editableCell(props, 'date'),
        width: 180
      },
      {
        Header: 'End date',
        accessor: "endDate",
        Cell: (props: any) => this.editableCell(props, 'date'),
        width: 180
      }, {
        Header: 'Particles',
        accessor: "particles",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 80
      }, {
        Header: 'Interval',
        accessor: "interval",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 80
      }, {
        Header: 'Credit',
        accessor: "credit",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 80
      }, {
        Header: 'Debit',
        accessor: "debit",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 80
      }, {
        Header: 'Total value',
        accessor: "totalValue",
        Cell: (props: any) => <NotEditableCell>{props.value}</NotEditableCell>,
        width: 100
      }, {
        Header: '',
        accessor: '',
        filterable: false,
        Cell: (cellProps: any) => {
          return <TransactionsTableRowActions
            id={cellProps.original.id}
            visible={cellProps.original.visible}
            removeTransaction={props.removeTransaction}
            updateTransaction={props.updateTransaction}
            dragDisabled={this.state.sorted.length ? true : false}
          />;
        },
        width: 120,
      }
    ];
  }

  onSortedChange = (nextSorted: SortingRule[], column: any) => {
    const { sorted } = this.state;
    const { id } = column;
    const actualSortValue: any = sorted.find((col: SortingRule) => col.id === id);
    const nextSortValue: SortingRule | undefined = nextSorted.find((col: SortingRule) => col.id === id);

    if (actualSortValue && nextSortValue && actualSortValue.desc && !nextSortValue.desc) {
      nextSorted = sorted.filter((col: SortingRule) => col.id !== id);
    }

    this.setState({
      sorted: nextSorted
    });
  }

  handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    this.props.dragTransaction(result.source.index, result.destination.index);
  }

  render() {
    const {
      transactions,
      updateTransactionsFilters,
      filters,
    } = this.props

    const {
      sorted,
      columns
    } = this.state;

    return <TransactionsTableContainer>
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <ReactTable
          TrComponent={DragTrComponent(sorted.length ? true : false)}
          TbodyComponent={DropTbodyComponent(sorted.length ? true : false)}
          FilterComponent={FilterComponent}

          data={transactions}
          columns={columns}
          defaultPageSize={10}
          sorted={sorted}
          onSortedChange={this.onSortedChange}
          getTrProps={(state: any, rowInfo: any, column: any) => {
            return {
              rowInfo,
              className: rowInfo && !rowInfo.original.visible ? 'not-visible-transaction' : '',
            };
          }}

          filterable
          onFilteredChange={updateTransactionsFilters}
          filtered={filters}
        />
      </DragDropContext>
    </TransactionsTableContainer>
  }
}
