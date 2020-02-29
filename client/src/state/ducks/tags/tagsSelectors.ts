export const getTagsSelector = (state: any) => (state.tags && state.tags.tags && state.tags.tags.toJS()) || [];

export const getTagsViewSelector = (state: any) => state.tags && state.tags.tagsView;
