import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES,
} from '../actions/article_actions';

import {
  REMOVE_CHUNK,
  RECEIVE_CHUNK
} from '../actions/chunk_actions';

const articlesReducer = (oldState = {}, action) => {
  const newState =  merge({}, oldState);
  let article;
  switch (action.type) {

    case RECEIVE_ARTICLE:
      return merge({}, oldState, {[action.article.id]: action.article});

    case REMOVE_CHUNK:
      article = newState[action.chunk.chunkable_id];
      article.chunks.splice(article.chunks.indexOf(action.chunk.id), 1);
      return newState;

    case RECEIVE_CHUNK:
      article = newState[action.chunk.chunkable_id];
      article.chunks.splice(action.chunk.ord, 0, action.chunk.id);
      return newState;
    case REMOVE_ARTICLE:
      delete newState[action.id];
      return newState;

    case RECEIVE_HOMEPAGE_ARTICLES:
      return merge({}, oldState, action.articles);

    default:
      return oldState;

  }
};

export default articlesReducer;
