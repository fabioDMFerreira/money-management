import { connect } from "react-redux";
import TagSelect from "./TagSelect";
import { createTag, getTagsSelector } from "state/ducks/tags";

export default connect((state: any) => {
  return {
    tags: getTagsSelector(state)
  };
}, {
  createTag
})(TagSelect);
