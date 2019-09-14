import { updateGlobalFilter, createTag } from 'redux/ducks/financial-forecast/actions';
import { connect } from 'react-redux';

import GlobalFilters from './GlobalFilters';

export default connect(
  (state: any) => {
    const {
      financialForecast: {
        globalFilters,
        tags
      }
    } = state;

    return {
      globalFilters,
      tags
    }
  }, {
    updateGlobalFilter,
    createTag
  }
)(GlobalFilters)
