import React from 'react';
import { connect } from 'react-redux';
import TagItem from './TagItem';
import { updateTag, deleteTag } from 'redux/ducks/financial-forecast/actions';


export default connect(null,{
  updateTag,
  deleteTag
})(TagItem);
