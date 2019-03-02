import React, { Component } from 'react';
import ReactTable, { SortingRule, Column } from 'react-table';
import styled from 'styled-components';
import Input from 'reactstrap/lib/Input';
import randomColor from 'randomcolor';

import TransactionData from '../../TransactionDataInterface';
import DateInput from './DateInput';
import TransactionsTableRowActions from './TransactionsTableRowActions';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragTrComponent, DropTbodyComponent } from './DragComponents';
import { dragTransaction, updateTransaction, createTag, changeTransactionsVisibilityByFilter } from 'scenes/FinancialForecast/FinancialForecastActions';
import Select from 'react-select/lib/Creatable';
import { ValueType } from 'react-select/lib/types';
import { TagType } from 'scenes/FinancialForecast/TagType';

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
  changeTransactionsVisibilityByFilter: typeof changeTransactionsVisibilityByFilter
};

type State = {
  sorted: SortingRule[],
  columns: object[],
};

export default class TransactionsTable extends Component<Props, State> {

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
        return <DateInput
          onChange={e => {
            this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
          }}
          value={cellInfo.value}
        />;
      case 'multiselect':
        const { tags, createTag } = this.props;

        return <Select
          options={tags}
          onChange={
            (value: ValueType<{ value: string, label: string, color?: string }>) => {
              this.props.updateTransaction(cellInfo.original.id, value, cellInfo.column.id)
            }
          }
          value={
            cellInfo.value
          }
          onCreateOption={(newOptionLabel: string) => {
            const newOption = { label: newOptionLabel, value: newOptionLabel.toLowerCase(), color: randomColor() }
            createTag(newOption);
            setTimeout(() => {
              this.props.updateTransaction(cellInfo.original.id, [...cellInfo.value, newOption], cellInfo.column.id)
            }, 0);
          }}
          isMulti
        />
      default:
        return <Input
          type={type || 'text'
          }
          value={cellInfo.value}
          onChange={e => {
            this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
          }}
        />
    }
  }

  buildColumns(props: Props): Column<any>[] {
    return [
      {
        Header: 'Description',
        accessor: "description",
        Cell: (props: any) => this.editableCell(props, 'text'),
        width: 300,
      }, {
        Header: 'Tags',
        accessor: "tags",
        filterable: true,
        filterMethod: (filter: any, row: any, column: any) => {
          const { value } = filter;
          return !!row.tags.find((tag: TagType) => tag.value.startsWith(value.toLowerCase()));
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
        width: 100
      }, {
        Header: 'Interval (months)',
        accessor: "interval",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 150
      }, {
        Header: 'Credit',
        accessor: "credit",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 100
      }, {
        Header: 'Debit',
        accessor: "debit",
        Cell: (props: any) => this.editableCell(props, 'number'),
        width: 100
      }, {
        Header: 'Total value',
        accessor: "totalValue",
        Cell: (props: any) => <NotEditableCell>{props.value}</NotEditableCell>,
        width: 100
      }, {
        Header: '',
        accessor: '',
        Cell: (cellProps: any) => {
          return <TransactionsTableRowActions
            id={cellProps.original.id}
            visible={cellProps.original.visible}
            removeTransaction={props.removeTransaction}
            updateTransaction={props.updateTransaction}
            dragDisabled={this.state.sorted.length ? true : false}
          />;
        },
        width: 150,
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
      changeTransactionsVisibilityByFilter
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
          onFilteredChange={(filtered) => {
            if (filtered && filtered.length) {
              const filters: string[] = [];
              const values: string[] = [];

              filtered.forEach(({ id, value }) => {
                filters.push(id);
                values.push(value);
              });

              changeTransactionsVisibilityByFilter(filters, values);
            } else {
              changeTransactionsVisibilityByFilter('', '');
            }
          }}
        />
      </DragDropContext>
    </TransactionsTableContainer>
  }
}
