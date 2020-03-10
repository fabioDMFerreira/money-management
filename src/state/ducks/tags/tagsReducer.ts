
import { Tag } from 'models/Tag';
import randomColor from 'randomcolor';

import { TagsActions, TagsView } from './tagsActions';
import {
  CLEAR_TAGS,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
  UPDATE_TAGS_VIEW,
} from './tagsTypes';


export interface TagsState {
  tags: Tag[];
  tagsView: TagsView;
}

const initialState: TagsState = {
  tags: [],
  tagsView: 'chart',
};

export default (state: TagsState = initialState, action: TagsActions) => {
  switch (action.type) {
    case CREATE_TAG: {
      const { tag } = action;

      return {
        ...state,
        tags: [...state.tags, tag],
      };
    }
    case DELETE_TAG: {
      const tags = state.tags
        .filter((tag: Tag) => tag.id !== action.tag.id);

      return {
        ...state,
        tags,
      };
    }
    case UPDATE_TAG: {
      const newTag = {
        ...action.newTag,
        color: action.newTag.color || randomColor({ luminosity: 'dark' }),
      };

      const tags = state.tags
        .map((tag: Tag) => (tag.id === action.tag.id ? newTag : tag));

      return {
        ...state,
        tags,
      };
    }
    case UPDATE_TAGS_VIEW: {
      return {
        ...state,
        tagsView: action.payload,
      };
    }
    case CLEAR_TAGS: {
      return {
        ...state,
        tags: [],
      };
    }
    default: return state;
  }
};
