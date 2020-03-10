import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTagsSelector, getTagsViewSelector, updateTagsView } from 'state/ducks/tags';
import { getExternalTransactions } from 'state/ducks/transactions/transactionsSelectors';
import Tags from 'views/pages/Tags/Tags';

const TagsContainer =
  connect(
    (state: any) => ({
      transactions: getExternalTransactions(state),
      tags: getTagsSelector(state),
      tagsView: getTagsViewSelector(state),
    }),
    {
      updateTagsView,
    },
  )(withRouter(Tags));

export default () => <TagsContainer />;
