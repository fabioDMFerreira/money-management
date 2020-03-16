import { connect } from 'react-redux';
import { bulkAddTransactions } from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';

import Onboarding from './Onboarding';

export default connect(null, {
  bulkAddTransactions: bulkAddTransactions('TRANSACTIONS'),
})(Onboarding);
