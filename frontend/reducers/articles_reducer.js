import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES,
} from '../actions/article_actions';

const articlesReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return merge({}, oldState, {[action.article.id]: action.article});
    case REMOVE_ARTICLE:
      const newState =  merge({}, oldState);
      delete newState[action.id];
      return newState;
    case RECEIVE_HOMEPAGE_ARTICLES:
      return merge({}, oldState, action.articles);
    default:
      return oldState;

  }
};

export default articlesReducer;
