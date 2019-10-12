import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TagPage from './TagPage';

import { Tag } from 'models/Tag';
import TransactionDataInterface from 'models/Transaction/TransactionConfig';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import { Link, match, withRouter } from 'react-router-dom';

interface Props {
  tag: Tag | undefined,
  transactions: TransactionDataInterface[] | [],
  match: match<{ id: string }>
}

class TagsPageContainer extends Component<Props> {

  render() {
    const { tag, transactions } = this.props;

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
  const { financialForecast: { transactions: stateTransactions, tags } } = state;
  let tag: any;
  let transactions: TransactionDataInterface[] = [];

  if (props.match.params && props.match.params.id) {
    tag = tags.find((tag: Tag) => tag.id === props.match.params.id);
    if (tag) {
      transactions = stateTransactions.filter((transaction: TransactionDataInterface) => {
        return transaction.tags && transaction.tags.map(t => t.id).includes(tag.id)
      });
    }
  }

  return {
    tag,
    transactions,
  };
}

export default withRouter(connect(mapStateToProps)(TagsPageContainer))
