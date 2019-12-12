import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateTagsView, getTagsSelector, getTagsViewSelector } from 'state/ducks/tags';
import Tags from 'views/pages/Tags/Tags';
import passesGlobalFilters from 'state/ducks/financial-forecast/utils/passesGlobalFilters';

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
