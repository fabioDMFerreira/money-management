import { Balance } from 'models/Balance';
import React, { Component } from 'react';
import ReactTable, { SortingRule } from 'react-table';
import styled from 'styled-components';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

const BalanceTableContainer = styled.div`
  &&&&{
    .rt-td{
      padding:4px 4px 1px 4px;
    }

    .form-control{
      border-radius:0px;
      border:0px;
      line-height:1.5;
    }
  }
`;

type BalanceData = {
  actualValue: number | undefined;
  estimateValue: number | undefined;
  income: number;
  outcome: number;
  balance: number;
  date: string | undefined;
}

type Props = {
  balance: Balance[];
};

type State = {
  sorted: SortingRule[];
  balance: BalanceData[];
};

const numberCell = (cellInfo: any) => <span>{cellInfo.value && cellInfo.value.toFixed(2)}</span>;

export default class BalanceTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.buildColumns(props);

    if (props.balance) {
      this.state.balance = props.balance.map(this.parseBalanceIntoJSON);
    }
  }

  state = {
    sorted: [] as SortingRule[],
    balance: [] as BalanceData[],
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.balance !== this.props.balance) {
      const balance = this.props.balance.map(this.parseBalanceIntoJSON);
      this.setState({
        balance,
      });
    }
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
      sorted: nextSorted,
    });
  }

  columns: object[] = [];

  parseBalanceIntoJSON = ({
    balance, income, outcome, actualValue, estimateValue, date,
  }: Balance): BalanceData => ({
    balance,
    income,
    outcome,
    actualValue,
    estimateValue,
    date: date ? YYYYMMDD(date) : undefined,
  })

  buildColumns(props: Props) {
    this.columns = [
      {
        Header: 'Date',
        accessor: 'date',
        width: 180,
      },
      {
        Header: 'Actual value',
        accessor: 'actualValue',
        Cell: numberCell,
      },
      {
        Header: 'Estimate value',
        accessor: 'estimateValue',
        Cell: numberCell,
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        Cell: numberCell,
        width: 180,
      }, {
        Header: 'Income',
        accessor: 'income',
        Cell: numberCell,
        width: 100,
      }, {
        Header: 'Outcome',
        accessor: 'outcome',
        Cell: numberCell,
        width: 150,
      },
    ];
  }

  render() {
    const {
      sorted,
      balance,
    } = this.state;

    return (
      <BalanceTableContainer>
        <ReactTable
          data={balance}
          columns={this.columns}
          defaultPageSize={10}
          sorted={sorted}
          onSortedChange={this.onSortedChange}
        />
      </BalanceTableContainer>
    );
  }
}
