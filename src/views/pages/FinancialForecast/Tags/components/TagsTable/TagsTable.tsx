import React from 'react';
import ReactTable from 'react-table';
import TagItem from 'views/pages/Settings/containers/TagItem';

const columns = [
  {
    Header: 'Tag',
    accessor: 'name',
    Cell: (cellInfo: any) => {
      return <TagItem tag={{
        label: cellInfo.original.name,
        id: cellInfo.original.id,
        color: cellInfo.original.color,
      }} />
    }
  }, {
    Header: 'Value',
    accessor: 'id'
  }, {
    Header: 'Percentage',
    accessor: 'percentage'
  }
];

type Props = {
  data: object[]
};

export default (props: Props) => {

  const totalValue = props.data.reduce((total, item: any) => {
    total += item.value;
    return total;
  }, 0);

  const data = props.data.map((item: any) => ({
    ...item,
    percentage: ((item.value * 100) / totalValue).toFixed(2) + ' %'
  })).sort((a: any, b: any) => b.value - a.value)

  return (
    <ReactTable
      columns={columns}
      data={data}
    />
  )
}
