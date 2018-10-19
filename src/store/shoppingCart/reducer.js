import reduceReducers from 'reduce-reducers';

import addItem from './addItem';
import updateItems from './updateItems';

export default reduceReducers(addItem, updateItems);
