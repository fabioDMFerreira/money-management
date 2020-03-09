import { Tag } from 'models/Tag';
import randomColor from 'randomcolor';
import getRandomString from 'utils/getRandomString';

import { CLEAR_TAGS, CREATE_TAG, DELETE_TAG, UPDATE_TAG, UPDATE_TAGS_VIEW } from './tagsTypes';

export interface ActionCreateTagInterface {
  type: typeof CREATE_TAG;
  tag: Tag;
}

export const createTag = (tag: { label: string; color?: string }): ActionCreateTagInterface => ({
  type: CREATE_TAG,
  tag: {
    id: getRandomString(),
    color: randomColor({ luminosity: 'dark' }),
    ...tag,
  },
});

export interface ActionDeleteTagInterface {
  type: typeof DELETE_TAG;
  tag: Tag;
}

export const deleteTag = (tag: Tag): ActionDeleteTagInterface => ({
  type: DELETE_TAG,
  tag,
});

export interface ActionUpdateTagInterface {
  type: typeof UPDATE_TAG;
  tag: Tag;
  newTag: Tag;
}

export const updateTag = (tag: Tag, newTag: Tag): ActionUpdateTagInterface => ({
  type: UPDATE_TAG,
  tag,
  newTag,
});

interface ActionClearTags {
  type: typeof CLEAR_TAGS;
}

export const clearTags = (): ActionClearTags => ({
  type: CLEAR_TAGS,
});

export type TagsView = 'chart' | 'table';

export interface ActionUpdateTagsView {
  type: typeof UPDATE_TAGS_VIEW;
  payload: TagsView;
}

export const updateTagsView = (payload: TagsView): ActionUpdateTagsView => ({
  type: UPDATE_TAGS_VIEW,
  payload,
});

export type TagsActions =
  ActionCreateTagInterface |
  ActionDeleteTagInterface |
  ActionUpdateTagInterface |
  ActionUpdateTagsView |
  ActionClearTags;
