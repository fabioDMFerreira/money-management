import React, { Component } from 'react';
import ReactTable, { SortingRule } from 'react-table';

import TransactionData from '../../TransactionData.interface';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Input from 'reactstrap/lib/Input';
import transactionEditableFields from '../../transactionEditableFields';

type Props = {
  transactions: TransactionData[],
  removeTransaction: (transactionId: string) => void
  updateTransaction: (transactionId: string, value: string, keyName: transactionEditableFields) => void
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
    return <span>
      <Input
        type={type || 'text'}
        value={cellInfo.value}
        onChange={e => {
          this.props.updateTransaction(cellInfo.original.id, e.target.value, cellInfo.column.id)
        }}
      />
    </span>
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
        width: 100
      }, {
        Header: '',
        acessor: '',
        Cell: (cellProps: any) => <Button color="link" onClick={() => props.removeTransaction(cellProps.original.id)}><FontAwesomeIcon icon={faTrash} /></Button>,
        width: 50,
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

  render() {
    const {
      transactions,
    } = this.props

    const {
      sorted
    } = this.state;

    return <ReactTable
      data={transactions}
      columns={this.columns}
      defaultPageSize={10}
      sorted={sorted}
      onSortedChange={this.onSortedChange}
    />
  }
}
