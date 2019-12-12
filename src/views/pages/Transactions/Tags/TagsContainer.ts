import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import passesGlobalFilters from 'state/ducks/financial-forecast/utils/passesGlobalFilters';
import { getTagsSelector, getTagsViewSelector, updateTagsView } from 'state/ducks/tags';
import Tags from 'views/pages/Tags/Tags';

export default
connect(
  (state: any) => {
    const { financialForecast: { transactions } } = state;

    // const filteredTransactions = transactions.filter(passesGlobalFilters(globalFilters));

    return {
      transactions: transactions && transactions.toJS(),
      tags: getTagsSelector(state),
      tagsView: getTagsViewSelector(state),
    };
  },
  {
    updateTagsView,
  },
)(withRouter(Tags));
