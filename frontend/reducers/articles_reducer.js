import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES,
  RECEIVE_TITLE,
  TOGGLE_ARTICLE_PUBLISHED
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
      newState[action.article.id] = action.article;
      return newState;

    case REMOVE_CHUNK:
      article = newState[action.chunk.chunkable_id];
      article.chunks.splice(article.chunks.indexOf(action.chunk.id), 1);
      return newState;

    case REMOVE_ARTICLE:
      delete newState[action.id];
      return newState;

    case RECEIVE_TITLE:
      return merge({}, oldState, action.title);

    case TOGGLE_ARTICLE_PUBLISHED:
      if (oldState[action.id].published) {
        newState[action.id].published = false;
      } else {
        newState[action.id].published = true;
      }
      return newState;

    case RECEIVE_HOMEPAGE_ARTICLES:
      return merge({}, oldState, action.articles);

    default:
      return oldState;

  }
};

export default articlesReducer;
