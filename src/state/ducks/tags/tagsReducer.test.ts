import { Tag } from 'models/Tag';
import { updateTag } from 'state/ducks/tags';

import { clearTags, createTag, deleteTag, updateTagsView } from './tagsActions';
import tagsReducer, { TagsState } from './tagsReducer';

const initialState: TagsState = {
  tags: [],
  tagsView: 'chart',
};

describe('Tags reducer', () => {
  it('should create a tag', () => {
    const tag: Tag = {
      id: '1',
      label: 'new tag',
      color: 'blue',
    };
    const actual = tagsReducer({ ...initialState }, createTag(tag));
    const expected = {
      ...initialState,
      tags: [tag],
    };

    expect(actual).toEqual(expected);
  });

  it('should remove a tag', () => {
    const tag: Tag = {
      id: '1',
      label: 'new tag',
      color: 'blue',
    };
    const state = {
      ...initialState,
      tags: [{ id: '1', label: 'name', color: 'blue' }],
    };

    const actual = tagsReducer(state, deleteTag(tag));
    const expected = {
      ...initialState,
      tags: [],
    };

    expect(actual).toEqual(expected);
  });

  it('should update a tag', () => {
    const tag: Tag = {
      id: '1',
      label: 'new tag',
      color: 'blue',
    };
    const newTag: Tag = {
      id: '2',
      label: 'new tag2',
      color: 'red',
    };
    const state = {
      ...initialState,
      tags: [tag],
    };

    const actual = tagsReducer(state, updateTag(tag, newTag));
    const expected = {
      ...initialState,
      tags: [newTag],
    };

    expect(actual).toEqual(expected);
  });

  it('should clear tags', () => {
    const tag: Tag = {
      id: '1',
      label: 'new tag',
      color: 'blue',
    };
    const tag2: Tag = {
      id: '2',
      label: 'new tag2',
      color: 'red',
    };
    const state = {
      ...initialState,
      tags: [tag, tag2],
    };

    const actual = tagsReducer(state, clearTags());
    const expected = {
      ...initialState,
      tags: [],
    };

    expect(actual).toEqual(expected);
  });

  it('should update the tags view', () => {
    const state: TagsState = {
      ...initialState,
      tagsView: 'chart',
    };

    const actual = tagsReducer(state, updateTagsView('table'));
    const expected = {
      ...initialState,
      tagsView: 'table',
    };

    expect(actual).toEqual(expected);
  });
});
