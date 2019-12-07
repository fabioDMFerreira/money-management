import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TagPage from './TagPage';

import { Tag } from 'models/Tag';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import { Link, match, withRouter } from 'react-router-dom';
import Balance from 'models/Balance';
import calculateTransactionsBalance from 'models/calculateTransactionsBalance';
import { getTagsSelector } from 'state/ducks/tags';

interface Props {
  tag: Tag | undefined,
  transactions: TransactionConfig[] | [],
  match: match<{ id: string }>
  balance: Balance[]
}

class TagsPageContainer extends Component<Props> {

  render() {
    const { tag, transactions, balance } = this.props;

    return (
      <Fragment>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/tags">Tags</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{this.props.match.params.id}</BreadcrumbItem>
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
          !tag && 'Tag does not exist!'
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any, props: any) => {
  const { financialForecast: { transactions: stateTransactions } } = state;
  const tags = getTagsSelector(state);
  let tag: any;
  let transactions: TransactionConfig[] = [];

  if (props.match.params && props.match.params.id) {
    tag = tags.find((tag: Tag) => tag.id === props.match.params.id);
    if (tag) {
      transactions = stateTransactions.toJS().filter((transaction: TransactionConfig) => {
        return transaction.tags && transaction.tags.includes(tag.id)
      });
    }
  }

  return {
    tag,
    transactions: transactions,
    balance: calculateTransactionsBalance(transactions),
  };
}

export default withRouter(connect(mapStateToProps)(TagsPageContainer))

