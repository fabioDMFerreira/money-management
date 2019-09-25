import React, { Component, Fragment } from 'react';

import TransactionDataInterface from 'models/ITransactionData';
import { Tag } from 'models/ITag';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { createTag, TagsView, updateTagsView } from 'redux/ducks/financial-forecast/actions';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartPie, faTable } from '@fortawesome/free-solid-svg-icons';
import { Link, RouteComponentProps } from 'react-router-dom';
import ToggleButton from 'views/components/ToggleButton';
import TagsTable from './components/TagsTable';
import TagsPie from './components/TagsPie';
import { generatePieCreditData, generatePieDebitData } from './components/TagsPie/utils';

type Props = RouteComponentProps & {
  transactions: TransactionDataInterface[]
  tags: Tag[]
  createTag: typeof createTag
  updateTagsView: typeof updateTagsView
  tagsView: TagsView
}

type State = {
  pieDebitData: object[]
  pieCreditData: object[]
  filter: any,
  transactions: TransactionDataInterface[],
}

export default class Tags extends Component<Props, State> {

  tagsFieldRef: { [key: string]: any } = {};

  state: State = {
    pieCreditData: [],
    pieDebitData: [],
    filter: [],
    transactions: [] as TransactionDataInterface[]
  }

  constructor(props: Props) {
    super(props);

    if (props.transactions) {
      this.state.pieCreditData = generatePieCreditData(props.transactions, props.tags);
      this.state.pieDebitData = generatePieDebitData(props.transactions, props.tags);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tags !== this.props.tags || prevProps.transactions !== this.props.transactions) {
      this.setState({
        pieCreditData: generatePieCreditData(this.props.transactions, this.props.tags),
        pieDebitData: generatePieDebitData(this.props.transactions, this.props.tags)
      })
    }
  }

  clickChart = (sliceClicked: any) => {
    this.props.history.push(`/tags/${sliceClicked.id}`);
  }

  render() {
    const { pieCreditData, pieDebitData, filter, transactions } = this.state;

    const { tagsView, updateTagsView } = this.props;

    return <Fragment>
      <Row className="mb-4">
        <Col xs="6">
          <ToggleButton
            active={tagsView === 'chart'}
            text='Chart'
            onClick={() => { updateTagsView('chart') }}
            icon={faChartPie}
          />
          <ToggleButton
            active={tagsView === 'table'}
            text='Table'
            onClick={() => { updateTagsView('table') }}
            icon={faTable}
          />
          <Link title="Tags management page" to="/settings" className="ml-2">
            <Button size="sm" color="link">Manage tags <FontAwesomeIcon icon={faCog} /></Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <h4>Credit</h4>
          {
            tagsView === 'chart' &&
            <TagsPie
              data={pieCreditData}
              onClick={this.clickChart}
            />
          }
          {
            tagsView === 'table' &&
            <TagsTable
              data={pieCreditData}
            />
          }
        </Col>
        <Col xs="6">
          <h4>Debit</h4>
          {
            tagsView === 'chart' &&
            <TagsPie
              data={pieDebitData}
              onClick={this.clickChart}
            />
          }
          {
            tagsView === 'table' &&
            <TagsTable
              data={pieDebitData}
            />
          }
        </Col>
      </Row>

    </Fragment >
  }
}
