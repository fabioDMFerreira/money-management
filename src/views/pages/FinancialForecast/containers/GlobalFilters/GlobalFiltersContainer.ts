import { updateGlobalFilter, createTag } from 'state/ducks/financial-forecast/actions';
import { connect } from 'react-redux';

import GlobalFilters from './GlobalFilters';

export default connect(
  (state: any) => {
    const {
      financialForecast: {
        globalFilters,
      }
    } = state;

    return {
      globalFilters,
    }
  }, {
  updateGlobalFilter,
}
)(GlobalFilters)
