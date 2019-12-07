import { updateTagsView, getTagsSelector, getTagsViewSelector } from 'state/ducks/tags';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Tags from 'views/pages/Tags/Tags';

export default
  connect(
    (state: any) => {
      const { financialForecast: { allTransactions } } = state;

      return {
        transactions: allTransactions && allTransactions.toJS(),
        tags: getTagsSelector(state),
        tagsView: getTagsViewSelector(state),
      }
    },
    {
      updateTagsView
    }
  )(withRouter(Tags))
