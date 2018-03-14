import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE
} from '../actions/comment_actions';

const commentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  const newState = merge({}, oldState);
  switch (action.type) {
    
    case RECEIVE_ARTICLE_COMMENTS:
      return merge({}, oldState, action.comments);

    case RECEIVE_COMMENT:
      return merge({}, oldState, {[action.comment.id]: action.comment});

    case REMOVE_COMMENT:
      delete newState[action.id];
      return newState;

    case RECEIVE_COMMENT_LIKE:
      newState[action.id].liked = true;
      newState[action.id].like_count += 1;
      return newState;

    case REMOVE_COMMENT_LIKE:
      newState[action.id].liked = false;
      newState[action.id].like_count -= 1;
      return newState;

    default:
      return oldState;
  }
};

export default commentsReducer;
