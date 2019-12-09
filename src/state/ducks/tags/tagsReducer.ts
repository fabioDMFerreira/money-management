import { List } from "immutable";
import randomColor from 'randomcolor';

import { Tag } from "models/Tag";

import { TagsActions, TagsView } from "./tagsActions";
import {
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
  UPDATE_TAGS_VIEW,
  CLEAR_TAGS
} from "./tagsTypes";

interface TagsState {
  tags: List<Tag>
  tagsView: TagsView
}

const initialState: TagsState = {
  tags: List<Tag>([]),
  tagsView: 'chart',
}

export default (state: TagsState = initialState, action: TagsActions) => {
  switch (action.type) {
    case CREATE_TAG: {
      const { tag } = action;

      return {
        ...state,
        tags: state.tags.push(tag)
      }
    }
    case DELETE_TAG: {

      const tags = state.tags
        .filter((tag: any) => tag.id !== action.tag.id)
        .toList();

      return {
        ...state,
        tags
      }
    }
    case UPDATE_TAG: {
      action.newTag = {
        ...action.newTag,
        color: action.newTag.color || randomColor({ luminosity: 'dark' })
      };

      const tags = state.tags
        .map((tag: any) => tag.id === action.tag.id ? action.newTag : tag)
        .toList();

      return {
        ...state,
        tags
      }
    }
    case UPDATE_TAGS_VIEW: {
      return {
        ...state,
        tagsView: action.payload
      }
    }
    case CLEAR_TAGS: {
      return {
        ...state,
        tags: List<Tag>()
      };
    }
    default: return state;
  }
}
