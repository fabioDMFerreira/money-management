export const getTagsSelector = (state: any) => {
  return state.tags && state.tags.tags && state.tags.tags.toJS() || []
}

export const getTagsViewSelector = (state:any)=>{
  return state.tags && state.tags.tagsView;
}
