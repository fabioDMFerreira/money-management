import { Balance } from 'models/Balance';
import { Tag } from 'models/Tag';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React, { Component } from 'react';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Row from 'reactstrap/lib/Row';
import TimelineContainer from 'views/pages/Transactions/Timeline';
import Timeline from 'views/pages/Transactions/Timeline/Timeline';

import TransactionsTable from '../../../containers/TransactionsTable/TransactionsTableContainer';
import TagItem from '../Settings/containers/TagItem';


interface Props {
  tag: Tag;
  transactions: TransactionConfig[];
  balance: Balance[];
}

export default ({ tag, balance, transactions }: Props) => (
  <div>
    <h2>{tag.label}</h2>
    <hr />
    <div className="mb-4 mt-4">
      <Row>
        <Col xs={2}>
          <TagItem tag={tag} />
        </Col>
      </Row>
    </div>
    <div className="mb-4">
      <Timeline
        balance={balance}
        transactions={transactions}
      />
    </div>
    <TransactionsTable
      transactions={transactions}
    />
  </div>
); ;
