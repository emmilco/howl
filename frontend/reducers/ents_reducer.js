import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import articlesReducer from './articles_reducer';
import chunksReducer from './chunks_reducer';
import commentsReducer from './comments_reducer';

const entsReducer = combineReducers({
  users: usersReducer,
  articles: articlesReducer,
  chunks: chunksReducer,
  comments: commentsReducer
});

export default entsReducer;
