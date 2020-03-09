import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import moment from 'moment';
import React, { Fragment } from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import DeleteButton from 'views/components/DeleteButton';

const AlignCenter = styled.div`
  text-align: center;
`;

interface Props {
  contracts: RecurringTransactionConfig[];
  removeContract: (id: string) => void;
}

const getColumns = ({ removeContract }: any) => [
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    Cell: (cellInfo: any) => (
      <AlignCenter>{cellInfo.value && moment(cellInfo.value).format('YYYY-MM-DD')}</AlignCenter>
    ),
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    Cell: (cellInfo: any) => (
      <AlignCenter>{cellInfo.value && moment(cellInfo.value).format('YYYY-MM-DD')}</AlignCenter>
    ),
  },
  {
    Header: 'Times',
    accessor: 'times',
    Cell: (cellInfo: any) => (
      <AlignCenter>{cellInfo.value}</AlignCenter>
    ),
  },
  {
    Header: 'Value per time',
    accessor: 'valuePerTime',
    Cell: (cellInfo: any) => (
      <AlignCenter>{cellInfo.value}</AlignCenter>
    ),
  },
  {
    Header: 'Total Value',
    accessor: 'totalValue',
    Cell: (cellInfo: any) => (
      <AlignCenter>{cellInfo.value}</AlignCenter>
    ),
  }, {
    Header: '',
    accessor: '',
    filterable: false,
    Cell: (cellProps: any) => (
      <Fragment>
        {
          removeContract &&
          <DeleteButton onClick={() => removeContract(cellProps.original.id)} />
        }
      </Fragment>
    ),
  },
];

export default ({ contracts, removeContract }: Props) => {
  const columns = getColumns({ removeContract });

  return (
    <Fragment>
      {
        contracts &&
        <ReactTable
          // data={[
          //   {
          //     description: 'rt 1',
          //   },
          // ]}
          data={contracts}
          columns={columns}
        />
      }
    </Fragment>
  );
};
