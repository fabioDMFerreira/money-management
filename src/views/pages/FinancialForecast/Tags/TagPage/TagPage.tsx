import React, { Component } from 'react';
import Input from 'reactstrap/lib/Input';

import { Tag } from 'models/Tag';
import TransactionsTable from '../../components/Transactions/TransactionsTable/TransactionsTableContainer';
import TransactionDataInterface from 'models/Transaction/TransactionConfig';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import TagItem from '../../../Settings/containers/TagItem';

interface Props {
  tag: Tag,
  transactions: TransactionDataInterface[]
}

class TagPage extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tag, transactions } = this.props;

    return (
      <div>
        <h2>{tag.label}</h2>
        <hr />
        <div className="mb-4 mt-4">
          <Row>
            <Col xs={2}>
              <TagItem tag={tag}/>
            </Col>
          </Row>
        </div>
        <TransactionsTable
          transactions={transactions}
        />
      </div>
    );
  }
}

export default TagPage;
