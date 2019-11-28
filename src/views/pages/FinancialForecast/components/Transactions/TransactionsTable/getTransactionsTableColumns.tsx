import React from 'react';
import styled from 'styled-components';
import { Column } from 'react-table';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import { ValueType } from 'react-select/lib/types';

import WalletSelect from 'views/pages/FinancialForecast/containers/WalletSelect';
import TagSelect from 'views/pages/FinancialForecast/containers/TagSelect';

import TransactionsTableRowActions from './TransactionsTableRowActions';
import EditableCell from './EditableCell';
import { Tag } from 'models/Tag';

const NotEditableCell = styled.span`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  display: block;
  color: rgb(73, 80, 87);
`;

interface Props {
  updateTransaction: any,
  removeTransaction: any,
  select: any,
  unselect: any,
  selectAll: any,
  unselectAll: any,
  areAllSelected: any,
  isSelected: any
}

export default (actions: Props): Column<any>[] => {
  return [
    {
      Header: () => <Input
        type="checkbox"
        checked={actions.areAllSelected()}
        onChange={e => {
          return e.target.checked ? actions.selectAll() : actions.unselectAll()
        }
        }
      />,
      accessor: '',
      filterable: false,
      sortable: false,
      Cell: (cellInfo: any) => {
        const selected = actions.isSelected(cellInfo.original.id);
        return <FormGroup check >
          <Input
            type="checkbox"
            checked={selected}
            onChange={(e) => selected ? actions.unselect(cellInfo.original.id) : actions.select(cellInfo.original.id)
            }
          />
        </FormGroup>
      },
      width: 50,
    },
    {
      Header: 'Description',
      accessor: "description",
      Cell: (props: any) => (
        <EditableCell
          type='text'
          cellInfo={props}
          update={actions.updateTransaction}
        />
      ),
    },
    // {
    //   Header: 'Particles',
    //   accessor: "particles",
    //   Cell: (props: any) => (
    //     <EditableCell
    //       type='number'
    //       cellInfo={props}
    //       update={actions.updateTransaction}
    //     />
    //   ),
    //   width: 80
    // },
    // {
    //   Header: 'Interval',
    //   accessor: "interval",
    //   Cell: (props: any) => this.editableCell(props, 'number'),
    //   width: 80
    // },
    // {
    //   Header: 'Total value',
    //   accessor: "totalValue",
    //   Cell: (props: any) => <NotEditableCell>{props.value} </NotEditableCell>,
    //   width: 80
    // },
    {
      Header: 'Tags',
      accessor: "tags",
      filterable: false,
      filterMethod: (filter: any, row: any) => {
        const { value } = filter;
        return row.tags && !!row.tags.find((tag: Tag) => tag.id && tag.id.startsWith(value.toLowerCase()));
      },
      Cell: (cellInfo: any) => (
        <TagSelect
          tagsSelected={cellInfo.value}
          onChange={
            (value: ValueType<Tag>) => {
              actions.updateTransaction(cellInfo.original.id, value, cellInfo.column.id);
            }
          }
        />
      ),
      getProps: () => {
        return {
          style: {
            overflow: 'visible',
          }
        };
      }
    }, {
      Header: 'Wallet',
      accessor: 'wallet',
      width: 125,
      Cell: (cellInfo: any) => (
        <WalletSelect
          onChange={(option: { label: string, value: string }) => {
            actions.updateTransaction(cellInfo.original.id, option && option.value ? option.value : null, cellInfo.column.id);
          }
          }
          walletSelected={cellInfo.value}
        />
      ),
      getProps: () => {
        return {
          style: {
            overflow: 'visible',
          }
        };
      }
    }, {
      Header: 'Date',
      accessor: "startDate",
      Cell: (props: any) => (
        <EditableCell
          type='date'
          cellInfo={props}
          update={actions.updateTransaction}
        />
      ),
      width: 180
    },
    {
      Header: 'Credit',
      accessor: "credit",
      Cell: (props: any) => (
        <EditableCell
          type='number'
          cellInfo={props}
          update={actions.updateTransaction}
        />
      ),
      width: 80
    }, {
      Header: 'Debit',
      accessor: "debit",
      Cell: (props: any) => (
        <EditableCell
          type='number'
          cellInfo={props}
          update={actions.updateTransaction}
        />
      ),
      width: 80
    },
    // {
    //   Header: 'End date',
    //   accessor: "endDate",
    //   Cell: (props: any) => (
    //     <EditableCell
    //       type='date'
    //       cellInfo={props}
    //       update={actions.updateTransaction}
    //     />
    //   ),
    //   width: 180
    // },
    {
      Header: '',
      accessor: '',
      filterable: false,
      Cell: (cellProps: any) => {
        return <TransactionsTableRowActions
          id={cellProps.original.id}
          visible={cellProps.original.visible}
          removeTransaction={actions.removeTransaction}
          updateTransaction={actions.updateTransaction}
          // dragDisabled={this.state.sorted.length ? true : false}
          dragDisabled
        />;
      },
      width: 120,
    },
  ];
}
