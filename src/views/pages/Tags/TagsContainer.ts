import { updateTagsView } from 'state/ducks/financial-forecast/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Tags from 'views/pages/Tags/Tags';

export default
  connect(
    (state: any) => {
      const { financialForecast: { allTransactions, tags, tagsView } } = state;

      return {
        transactions: allTransactions && allTransactions.toJS(),
        tags: tags && tags.toJS(),
        tagsView,
      }
    },
    {
      updateTagsView
    }
  )(withRouter(Tags))
