import { updateTagsView } from 'redux/ducks/financial-forecast/actions';
import { createTag } from 'redux/ducks/financial-forecast/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Tags from './Tags';

export default
  connect(
    (state: any) => {
      const { financialForecast: { transactions, tags, tagsView } } = state;

      return {
        transactions: transactions && transactions.toJS(),
        tags: tags && tags.toJS(),
        tagsView,
      }
    },
    {
      createTag,
      updateTagsView
    }
  )(withRouter(Tags))
