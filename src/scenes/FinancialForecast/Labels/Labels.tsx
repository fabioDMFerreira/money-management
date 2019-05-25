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
import { createTag, updateTransaction } from '../state/FinancialForecastActions';
import { ValueType } from 'react-select/lib/types';
import TransactionsTable from '../TransactionsPage';

type Props = {
  transactions: TransactionDataInterface[]
  tags: TagType[]
  createTag: typeof createTag
  updateTransaction: any
}

type State = {
  pieDebitData: object[]
  pieCreditData: object[]
  filter: any,
  transactions: TransactionDataInterface[]
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
    filter: [],
    transactions: [] as TransactionDataInterface[]
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
      filter,
      transactions: this.props.transactions.filter(transaction => {
        if (transaction.tags && !transaction.tags.length && filter.find((option: any) => option.value === null)) {
          return true;
        }

        return filter.some((f: any) => {
          return transaction.tags && transaction.tags.map(tag => tag.value).includes(f.value);
        })
      })
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

  clickChart = (sliceClicked: any) => {
    const { tags } = this.props;

    const tagSelected =
      [{ label: 'Unassigned', value: null }, ...tags].find(tag => tag.label === sliceClicked.name);

    if (tagSelected) {
      this.changeFilters([tagSelected]);
    }
  }

  render() {
    const { pieCreditData, pieDebitData, filter, transactions } = this.state;

    const { tags } = this.props;

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
              onClick={this.clickChart}
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
              onClick={this.clickChart}
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
            options={[{ label: 'Unassigned', value: null }, ...tags]}
            placeholder={"Select tags"}
          />
        </Col>
      </Row>

      {
        filter && filter.length ?
          <TransactionsTable
            transactions={transactions}
          />
          :
          ''
      }

    </Fragment>
  }
}
