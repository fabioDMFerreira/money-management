import { Tag } from 'models/Tag';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTag, updateTag } from 'state/ducks/tags';
import EditableRemovableListItem from 'views/components/EditableRemovableListItem';

interface Props {
  tag: Tag;
  update: (tag: Tag, value: string) => void;
  remove: (tag: Tag) => void;
}

const TagItemContainer = (props: Props) => (
  <EditableRemovableListItem<Tag>
    element={props.tag}
    update={props.update}
    remove={props.remove}
    link={`/tags/${props.tag.id}`}
    label={props.tag.label}
    color={props.tag.color}
  />
);

export default connect(null, dispatch => ({
  update: (tag: Tag, value: string) => dispatch(updateTag(tag, { label: value, id: value.toLowerCase() })),
  remove: (tag: Tag) => dispatch(deleteTag(tag)),
}))(TagItemContainer);
