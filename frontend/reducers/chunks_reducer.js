import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE
} from '../actions/article_actions';

import {
  RECEIVE_CHUNKS,
  REMOVE_CHUNK
} from '../actions/chunk_actions';

const chunksReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return merge({}, oldState, action.chunks);
    default:
      return oldState;

  }
};

export default chunksReducer;
