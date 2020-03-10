import { Balance } from 'models/Balance';
import { Tag } from 'models/Tag';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, match, withRouter } from 'react-router-dom';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import { getTagsSelector } from 'state/ducks/tags';
import { getAllTransactionsSelector } from 'state/ducks/transactions';
import calculateTransactionsBalance from 'usecases/calculateBalance/calculateTransactionsBalancesByMonth';
import TagTransactions from 'views/pages/Transactions/TagTransactions';

import TagPage from './TagPage';

interface Props {
  tag: Tag | undefined;
  transactions: TransactionConfig[] | [];
  match: match<{ id: string }>;
  balance: Balance[];
}

const TagsPageContainer = ({
  tag, transactions, balance, match,
}: Props) => (
  <Fragment>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/tags">Tags</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>{match.params.id}</BreadcrumbItem>
    </Breadcrumb>
    {
      tag &&
        <TagPage
          tag={tag}
          transactions={transactions}
          balance={balance}
        />
    }
    {
      !tag && <TagTransactions />
    }
  </Fragment>
);

const mapStateToProps = (state: any, props: any) => {
  const allTransactions = getAllTransactionsSelector(state);
  const tags = getTagsSelector(state);
  let tag: any;
  let transactions: TransactionConfig[] = [];

  if (props.match.params && props.match.params.id) {
    tag = tags.find((tag: Tag) => tag.id === props.match.params.id);
    if (tag) {
      transactions =
        allTransactions.filter((transaction: TransactionConfig) =>
          transaction.tags && transaction.tags.includes(tag.id) && !transaction.isInternalTransaction);
    }
  }

  const realTransactions = transactions.map(transaction => Transaction.buildFromTransactionData(transaction));

  return {
    tag,
    transactions,
    balance: calculateTransactionsBalance(realTransactions),
  };
};

export default withRouter(connect(mapStateToProps)(TagsPageContainer));

