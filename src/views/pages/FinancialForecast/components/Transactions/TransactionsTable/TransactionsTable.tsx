import React, { Component } from 'react';
import ReactTable, { SortingRule, Column } from 'react-table';
import styled from 'styled-components';

import TransactionData from 'models/Transaction/TransactionConfig';
import { dragTransaction, updateTransaction, createTag, updateTransactionsFilters, filterType } from 'state/ducks/financial-forecast/actions';
import { Tag } from 'models/Tag';
import FilterComponent from './FilterComponent';
import TransactionDataInterface from 'models/Transaction/TransactionConfig';
import getTransactionsTableColumns from './getTransactionsTableColumns';

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



export type Props = {
  transactions: TransactionData[],
  removeTransaction?: (transactionId: string) => void
  updateTransaction?: any,
  dragTransaction?: any,
  createTag?: typeof createTag,
  select?: any,
  unselect?: any,
  selectAll?: any,
  unselectAll?: any,
  tags?: Tag[],
  updateTransactionsFilters?: any,
  selected?: any,
  filters?: filterType[],
  pageSize?: number,
};

type State = {
  sorted: SortingRule[],
  columns: object[],
  allSelected: boolean
};


export default class TransactionsTable extends Component<Props, State> {

  state = {
    sorted: [],
    columns: [] as object[],
    allSelected: false
  }

  constructor(props: Props) {
    super(props);

    const { updateTransaction, removeTransaction, selectAll, select, unselect, unselectAll } = props;

    this.state.columns = getTransactionsTableColumns({
      updateTransaction,
      removeTransaction,
      select,
      unselect,
      selectAll,
      unselectAll,
      areAllSelected: this.areAllSelected,
      isSelected: this.isSelected,
    });
  }

  selectAll = (value: boolean) => {
    this.props.transactions.forEach((transaction: TransactionDataInterface) => {
      if (transaction.id) {
        this.props.updateTransaction(transaction.id, value, 'selected');
      }
    });

    this.setState({
      allSelected: value
    });
  }

  areAllSelected = () => {
    if(!this.props.selected){
      return;
    }

    return Object.keys(this.props.selected).length === this.props.transactions.length &&
      !Object.values(this.props.selected).some(val => !val)
  }

  isSelected = (id: string) => {
    return this.props.selected[id];
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
    if (this.props.dragTransaction) {
      this.props.dragTransaction(result.source.index, result.destination.index);
    }
  }

  render() {
    const {
      transactions,
      updateTransactionsFilters,
      filters,
      pageSize,
    } = this.props

    const {
      sorted,
      columns
    } = this.state;

    return <TransactionsTableContainer>
      {/* <DragDropContext onDragEnd={this.handleDragEnd}> */}
      <ReactTable
        // TrComponent={DragTrComponent(sorted.length ? true : false)}
        // TbodyComponent={DropTbodyComponent(sorted.length ? true : false)}
        FilterComponent={FilterComponent}

        data={transactions}
        columns={columns}
        defaultPageSize={pageSize || 10}
        sorted={sorted}
        onSortedChange={this.onSortedChange}
        getTrProps={(state: any, rowInfo: any, column: any) => {
          return {
            rowInfo,
            className: rowInfo && !rowInfo.original.visible ? 'not-visible-transaction' : '',
          };
        }}

        filterable={false}
        onFilteredChange={updateTransactionsFilters}
        filtered={filters}
      />
      {/* </DragDropContext> */}
    </TransactionsTableContainer>
  }
}
