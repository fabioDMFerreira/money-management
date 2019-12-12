import { connect } from 'react-redux';
import { createTag, getTagsSelector } from 'state/ducks/tags';

import TagSelect from './TagSelect';

export default connect((state: any) => ({
  tags: getTagsSelector(state),
}), {
  createTag,
})(TagSelect);
