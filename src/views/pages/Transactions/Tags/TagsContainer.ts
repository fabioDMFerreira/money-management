import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getExternalTransactions } from 'state/ducks/financial-forecast/transactionsSelectors';
import { getTagsSelector, getTagsViewSelector, updateTagsView } from 'state/ducks/tags';
import Tags from 'views/pages/Tags/Tags';

export default
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
