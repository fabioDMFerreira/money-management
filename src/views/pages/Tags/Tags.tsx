import React, { Component, Fragment } from 'react';

import TransactionDataInterface from 'models/Transaction/TransactionConfig';
import { Tag } from 'models/Tag';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { TagsView, updateTagsView } from 'state/ducks/tags';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartPie, faTable } from '@fortawesome/free-solid-svg-icons';
import { Link, RouteComponentProps } from 'react-router-dom';
import ToggleButton from 'views/components/ToggleButton';
import TagsTable from './components/TagsTable';
import TagsPie from './components/TagsPie';
import { generatePieCreditData, generatePieDebitData } from './components/TagsPie/utils';
import Onboarding from 'views/components/Onboarding';
import Translate from 'views/components/Translate';
import { CREDIT, DEBIT } from 'locale/consts';

type Props = RouteComponentProps & {
  transactions: TransactionDataInterface[]
  tags: Tag[]
  updateTagsView?: typeof updateTagsView
  tagsView?: TagsView
  hideControls?: boolean
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
    const { pieCreditData, pieDebitData } = this.state;

    const { updateTagsView, hideControls, transactions, tags } = this.props;

    let tagsView = this.props.tagsView || 'chart';

    if (!pieCreditData.length || !pieDebitData.length) {
      return <Row>
        <Col xs="6">
          <Onboarding transactions={transactions} tags={[]} />
        </Col>
      </Row>
    }

    return <Fragment>
      {
        !hideControls &&
        <Row className="mb-4">
          <Col xs="6">
            <ToggleButton
              active={tagsView === 'chart'}
              text='Chart'
              onClick={() => { updateTagsView && updateTagsView('chart') }}
              icon={faChartPie}
            />
            <ToggleButton
              active={tagsView === 'table'}
              text='Table'
              onClick={() => { updateTagsView && updateTagsView('table') }}
              icon={faTable}
            />
            <Link title="Tags management page" to="/tags/settings/list" className="ml-2">
              <Button size="sm" color="link">Manage tags <FontAwesomeIcon icon={faCog} /></Button>
            </Link>
          </Col>
        </Row>
      }
      <Row>
        <Col xs="6">
          <h4><Translate id={CREDIT} /></h4>
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
          <h4><Translate id={DEBIT} /></h4>
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
