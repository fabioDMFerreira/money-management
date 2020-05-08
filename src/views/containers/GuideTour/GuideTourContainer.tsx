import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

import GuideTour from './GuideTour';

export default connect((state: any) => ({
  translate: getTranslate(state.localize),
}))(GuideTour);
