import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE
} from '../actions/article_actions';

import {
  RECEIVE_CHUNK,
  REMOVE_CHUNK
} from '../actions/chunk_actions';

const chunksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return merge({}, oldState, action.chunks);
    case RECEIVE_CHUNK:
      return merge({}, oldState, action.chunk);
    case REMOVE_CHUNK:
      const newState = merge({}, oldState);
      delete newState[action.chunk.id];
      return newState;
    default:
      return oldState;

  }
};

export default chunksReducer;
