import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getTagsSelector, getTagsViewSelector, updateTagsView } from 'state/ducks/tags';
import Tags from 'views/pages/Tags/Tags';

export default
connect(
  (state: any, props: any) => {
    const { financialForecast: { allTransactions } } = state;

    return {
      transactions: allTransactions && allTransactions.toJS(),
      tags: getTagsSelector(state),
      tagsView: getTagsViewSelector(state),
    };
  },
  {
    updateTagsView,
  },
)(withRouter(Tags));
