import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comment_actions';

const commentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ARTICLE_COMMENTS:
    return merge({}, oldState, action.comments);
    case RECEIVE_COMMENT:
    return merge({}, oldState, action.comment);
    case REMOVE_COMMENT:
    const newState = merge({}, oldState);
    delete newState[action.id];
    return newState;
    default:
      return oldState;

  }
};

export default commentsReducer;
