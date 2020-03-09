export const getTagsSelector = (state: any) => (state.tags && state.tags.tags) || [];

export const getTagsViewSelector = (state: any) => state.tags && state.tags.tagsView;
