import React from 'react';
import styled from 'styled-components';
import { Column } from 'react-table';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import { ValueType } from 'react-select/lib/types';

import WalletSelect from 'views/pages/Transactions/containers/WalletSelect';
import TagSelect from 'views/pages/Transactions/containers/TagSelect';

import TransactionsTableRowActions from './TransactionsTableRowActions';
import EditableCell from './EditableCell';
import { Tag } from 'models/Tag';
import { selectAllTransactions, selectTransaction, unselectAllTransactions, unselectTransaction } from 'state/ducks/financial-forecast/actions';

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

interface SelectColumnProps {
  areAllSelected: any,
  selectAll: any,
  unselectAll: any,
  select: any,
  unselect: any,
  isSelected: any
}

const selectColumn = (actions: SelectColumnProps) => ({
	Header: () => (<Input
		type="checkbox"
		checked={actions.areAllSelected()}
		onChange={e => (e.target.checked ? actions.selectAll() : actions.unselectAll())
		}
	               />),
	accessor: '',
	filterable: false,
	sortable: false,
	Cell: (cellInfo: any) => {
		const selected = actions.isSelected(cellInfo.original.id);
		return (
			<FormGroup check>
				<Input
					type="checkbox"
					checked={selected}
					onChange={e => (selected ? actions.unselect(cellInfo.original.id) : actions.select(cellInfo.original.id))
					}
				/>
			</FormGroup>
		);
	},
	width: 50,
});

const descriptionColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Description',
	accessor: 'description',
	Cell: (props: any) => (
		actions.updateTransaction ?
			<EditableCell
				type="text"
				cellInfo={props}
				update={actions.updateTransaction}
			/> :
			<span>{props.value}</span>
	),
});

const tagsColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Tags',
	accessor: 'tags',
	filterable: false,
	filterMethod: (filter: any, row: any) => {
		const { value } = filter;
		return row.tags && !!row.tags.find((tag: Tag) => tag.id && tag.id.startsWith(value.toLowerCase()));
	},
	Cell: (cellInfo: any) => (
		<TagSelect
			tagsSelected={cellInfo.value}
			onChange={
				(value: { id: string, label: string, value: string }[]) => {
					if (actions.updateTransaction) {
						actions.updateTransaction(cellInfo.original.id, value, cellInfo.column.id);
					}
				}
			}
		/>
	),
	getProps: () => ({
		style: {
			overflow: 'visible',
		},
	}),
});

const walletColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Wallet',
	accessor: 'wallet',
	width: 125,
	Cell: (cellInfo: any) => (
		<WalletSelect
			onChange={(option: { label: string, value: string }) => {
				if (actions.updateTransaction) {
					actions.updateTransaction(cellInfo.original.id, option && option.value ? option.value : null, cellInfo.column.id);
				}
			}
			}
			walletSelected={cellInfo.value}
		/>
	),
	getProps: () => ({
		style: {
			overflow: 'visible',
		},
	}),
});

const startDateColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Date',
	accessor: 'startDate',
	Cell: (props: any) => (
		actions.updateTransaction ?
			<EditableCell
				type="date"
				cellInfo={props}
				update={actions.updateTransaction}
			/> :
			<span>{props.value}</span>
	),
	width: 180,
});

const creditColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Credit',
	accessor: 'credit',
	Cell: (props: any) => (
		actions.updateTransaction ?
			<EditableCell
				type="number"
				cellInfo={props}
				update={actions.updateTransaction}
			/> : <span>{props.value}</span>
	),
	width: 80,
});

const debitColumn = (actions: { updateTransaction: any }) => ({
	Header: 'Debit',
	accessor: 'debit',
	Cell: (props: any) => (
		actions.updateTransaction ?
			<EditableCell
				type="number"
				cellInfo={props}
				update={actions.updateTransaction}
			/> : <span>{props.value}</span>
	),
	width: 80,
});

const actionsColumn = (actions: { updateTransaction: any, removeTransaction: any }) => ({
	Header: '',
	accessor: '',
	filterable: false,
	Cell: (cellProps: any) => (<TransactionsTableRowActions
		id={cellProps.original.id}
		visible={cellProps.original.visible}
		removeTransaction={actions.removeTransaction}
		updateTransaction={actions.updateTransaction}
		// dragDisabled={this.state.sorted.length ? true : false}
		dragDisabled
	                           />),
	width: 120,
});

export default (actions: Props): Column<any>[] => {
	let columns = [
		selectColumn(actions),
		descriptionColumn(actions),
		tagsColumn(actions),
		walletColumn(actions),
		startDateColumn(actions),
		creditColumn(actions),
		debitColumn(actions),
	].filter(c => c);

	if (!actions.selectAll || !actions.select || !actions.unselectAll || !actions.unselect) {
		columns = columns.slice(1);
	}

	if (actions.updateTransaction && actions.removeTransaction) {
		columns.push(actionsColumn(actions));
	}

	return columns;
};
