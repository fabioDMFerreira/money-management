import React, { Component } from 'react';
import ReactTable, { SortingRule } from 'react-table';
import styled from 'styled-components';

import Input from 'reactstrap/lib/Input';

import TransactionData from '../../TransactionDataInterface';
import DateInput from './DateInput';
import TransactionsTableRowActions from './TransactionsTableRowActions';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragTrComponent, DropTbodyComponent } from './DragComponents';
import { dragTransaction, updateTransaction } from 'scenes/FinancialForecast/FinancialForecastActions';

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
  dragTransaction: typeof dragTransaction
};

type State = {
  sorted: SortingRule[]
};

export default class TransactionsTable extends Component<Props, State> {

  columns: object[] = [];

  state = {
    sorted: []
  }

  constructor(props: Props) {
    super(props);

    this.buildColumns(props);
  }

  editableCell = (cellInfo: any, type: "text" | "date" | "number") => {
    switch (type) {
      case 'date':
        return <DateInput
          onChange={e => {
            this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
          }}
          value={cellInfo.value}
        />;
      default:
        return <Input
          type={type || 'text'}
          value={cellInfo.value}
          onChange={e => {
            this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
          }}
        />
    }
  }

  buildColumns(props: Props) {
    this.columns = [
      {
        Header: 'Description',
        accessor: "description",
        Cell: (props: any) => this.editableCell(props, 'text'),
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
        acessor: '',
        Cell: (cellProps: any) => {
          return <TransactionsTableRowActions
            id={cellProps.original.id}
            visible={cellProps.original.visible}
            removeTransaction={props.removeTransaction}
            updateTransaction={props.updateTransaction}
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
    } = this.props

    const {
      sorted
    } = this.state;

    return <TransactionsTableContainer>
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <ReactTable
          TrComponent={DragTrComponent}
          TbodyComponent={DropTbodyComponent}
          data={transactions}
          columns={this.columns}
          defaultPageSize={10}
          sorted={sorted}
          onSortedChange={this.onSortedChange}
          getTrProps={(state: any, rowInfo: any, column: any) => {
            return {
              rowInfo,
              className: rowInfo && !rowInfo.original.visible ? 'not-visible-transaction' : '',
              // style: {
              //   background: rowInfo && !rowInfo.original.visible ? "#ccc" : "#fff"
              // }
            };
          }}
        />
      </DragDropContext>
    </TransactionsTableContainer>
  }
}
