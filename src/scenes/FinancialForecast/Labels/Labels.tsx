import React, { Component, Fragment } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import randomColor from 'randomcolor';

import TransactionDataInterface from '../TransactionDataInterface';
import { TagType } from '../TagType';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Select from 'react-select';
import SelectCreatable from 'react-select/lib/Creatable';
import ReactTable from 'react-table';
import { createTag, updateTransaction } from '../FinancialForecastActions';
import { ValueType } from 'react-select/lib/types';

type Props = {
  transactions: TransactionDataInterface[]
  tags: TagType[]
  createTag: typeof createTag
  updateTransaction: typeof updateTransaction
}

type State = {
  pieDebitData: object[]
  pieCreditData: object[]
  filter: any
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export default class Labels extends Component<Props, State> {

  tagsFieldRef: { [key: string]: any } = {};

  state: State = {
    pieCreditData: [],
    pieDebitData: [],
    filter: [{ label: 'Unsassigned', value: null }]
  }

  constructor(props: Props) {
    super(props);

    this.state.pieCreditData = this.generatePieCreditData();
    this.state.pieDebitData = this.generatePieDebitData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tags !== this.props.tags || prevProps.transactions !== this.props.transactions) {
      this.setState({
        pieCreditData: this.generatePieCreditData(),
        pieDebitData: this.generatePieDebitData()
      })
    }
  }

  generatePieCreditData() {
    const { transactions, tags } = this.props;
    const creditData = [
      {
        name: 'Unassigned',
        value: transactions.reduce((value, transaction) => {
          if (transaction.tags && !transaction.tags.length && transaction.credit && +transaction.credit) {
            value += transaction.totalValue ? +transaction.totalValue : 0;
          }

          return value;
        }, 0),
        color: 'grey'
      },
      ...tags.map((tag: TagType) => ({
        name: tag.label,
        color: tag.color,
        value: transactions.reduce((value, transaction) => {
          if (transaction.tags && transaction.tags.map(t => t.value).includes(tag.value) && transaction.credit && +transaction.credit) {
            value += transaction.totalValue ? +transaction.totalValue : 0;
          }

          return value;
        }, 0)
      }))
    ].filter(data => data.value);

    return creditData;
  }

  generatePieDebitData() {
    const { transactions, tags } = this.props;
    const debitData = [
      {
        name: 'Unassigned',
        value: transactions.reduce((value, transaction) => {
          if (transaction.tags && !transaction.tags.length && transaction.debit && +transaction.debit) {
            value -= transaction.totalValue ? +transaction.totalValue : 0;
          }

          return value;
        }, 0),
        color: 'grey'
      },
      ...tags.map((tag: TagType) => ({
        name: tag.label,
        color: tag.color,
        value: transactions.reduce((value, transaction) => {
          if (transaction.tags && transaction.tags.map(t => t.value).includes(tag.value) && transaction.debit && +transaction.debit) {
            value -= transaction.totalValue ? +transaction.totalValue : 0;
          }

          return value;
        }, 0)
      }))
    ].filter(data => data.value);

    return debitData;
  }

  changeFilters = (filter: any) => {
    this.setState({
      filter
    });
  }

  editableCell = (cellInfo: any) => {
    const { tags, createTag } = this.props;

    return <SelectCreatable
      options={tags}
      onChange={
        (value: ValueType<TagType>) => {
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
  }

  render() {
    const { pieCreditData, pieDebitData, filter } = this.state;

    const { tags, transactions } = this.props;

    return <Fragment>
      <Row>
        <Col xs="6">
          <h4>Credit</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={pieCreditData}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {
                pieCreditData.map((entry: any, index) => <Cell key={`cell-${index}`} fill={entry && entry.color ? entry.color : randomColor()} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
        <Col xs="6">
          <h4>Debit</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={pieDebitData}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {
                pieDebitData.map((entry: any, index) => <Cell key={`cell-${index}`} fill={entry && entry.color ? entry.color : randomColor()} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <Select
            isMulti
            value={filter}
            onChange={this.changeFilters}
            options={[{ label: 'Unsassigned', value: null }, ...tags]}
            placeholder={"Select tags"}
          />
        </Col>
      </Row>

      <ReactTable
        columns={
          [
            {
              Header: 'Description',
              accessor: "description",
              width: 250,
            },
            {
              Header: 'Start date',
              accessor: "startDate",
              width: 180
            },
            {
              Header: 'Credit',
              accessor: "credit",
              width: 80
            }, {
              Header: 'Debit',
              accessor: "debit",
              width: 80
            }, {
              Header: 'Total value',
              accessor: "totalValue",
              width: 80
            },{
              Header: 'Tags',
              accessor: "tags",
              Cell: (props: any) => this.editableCell(props),
              getProps: () => {
                return {
                  style: {
                    overflow: 'visible',
                  }
                };
              }
            },
          ]
        }
        data={
          transactions.filter(transaction => {
            if (transaction.tags && !transaction.tags.length && filter.find((option: any) => option.value === null)) {
              return true;
            }

            return filter.some((f: any) => {
              return transaction.tags && transaction.tags.map(tag => tag.value).includes(f.value);
            })
          })
        }
      />

    </Fragment>
  }
}
